import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

/**
 * News detail page (English data fields)
 * - Matches Onepixart color system
 * - Fetches by slug/id from API, with mock fallback
 * - Accepts optional preloaded item via route `state`
 */

type NewsItem = {
  id: string | number;
  title_en: string;
  description_en: string; // meta/preview text
  content_en: string; // full article body (plain text with \n\n between paragraphs)
  date: string; // ISO or human-readable date
  image: string; // hero image URL
  slug?: string;
  tags?: string[];
};

type FetchState = "idle" | "loading" | "success" | "error";

// ---- Development fallback (remove in production) ----
const MOCK_NEWS: NewsItem[] = [
  {
    id: 1,
    title_en: "Onepixart unveils a fresh design language",
    description_en:
      "A modern visual system focused on clarity, contrast, and motion.",
    content_en:
      "Onepixart introduces a modern visual system focused on clarity, contrast, and motion.\n\nIt emphasizes accessible color palettes, generous spacing, and expressive yet minimalist typography. Designers can combine these tokens to build portfolio pages, news layouts, and case studies that feel both premium and performant.",
    date: "2025-08-25",
    image: " /images/news/news1.jpg",
    tags: ["Design", "Onepixart", "Update"],
    slug: "onepixart-unveils-fresh-design",
  },
  {
    id: 2,
    slug: "ui-ux-trends-next-quarter",
    title_en: "UI/UX trends shaping the next quarter",
    description_en:
      "Practical trends from micro-interactions to accessible color systems.",
    content_en:
      "From micro-interactions to accessible color systems, here are the practical trends that will actually ship in production.\n\nTeams should also prioritize performance budgets and motion design guidelines to keep interfaces delightful across devices.",
    date: "2025-08-20",
    image: " /images/news/news2.jpg",
    tags: ["UI/UX", "Trends"],
  },
  {
    id: 3,
    title_en: "Performance checklist for React + Tailwind apps",
    date: "August 15, 2025",
    image: "/images/news/news3.jpg",
    content_en:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae in veritatis eveniet expedita odio, consequuntur quod molestiae laudantium molestias obcaecati impedit ut, id neque, reprehenderit iste doloribus minima! Alias, impedit.",
    description_en:
      "Minify images, prefetch routes, lazy‑load modals—this quick checklist helps your pages hit great Lighthouse scores.",
    tags: ["Frontend", "Performance"],
    slug: "performance-checklist-react-tailwind",
  },
];

function formatDate(input: string) {
  const d = new Date(input);
  if (isNaN(d.getTime())) return input; // fallback if already human-readable
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadingMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200)); // ~200 wpm
}

export default function NewsDetail() {
  const { slugOrId } = useParams<{ slugOrId: string }>();
  const location = useLocation();
  const preloaded: NewsItem | undefined = (location.state as any)?.news;

  const [state, setState] = useState<FetchState>(
    preloaded ? "success" : "idle"
  );
  const [item, setItem] = useState<NewsItem | null>(preloaded || null);

  // Try to fetch from API; fallback to mock by slug/id
  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!slugOrId || preloaded) return;
      try {
        setState("loading");
        // --- API endpoint example ---
        // Expect a JSON like { item: NewsItem }
        const apiBase = import.meta.env.VITE_API_URL;
        if (apiBase) {
          const res = await fetch(
            `${apiBase}/api/news/${encodeURIComponent(slugOrId)}?lang=en`
          );
          if (!cancelled) {
            if (res.ok) {
              const data = (await res.json()) as { item?: NewsItem };
              if (data?.item) {
                setItem(data.item);
                setState("success");
                return;
              }
            }
          }
        }
        // Fallback to mock
        if (!cancelled) {
          const found = MOCK_NEWS.find(
            (n) => n.slug === slugOrId || String(n.id) === String(slugOrId)
          );
          setItem(found || null);
          setState(found ? "success" : "error");
        }
      } catch {
        if (!cancelled) {
          const found = MOCK_NEWS.find(
            (n) => n.slug === slugOrId || String(n.id) === String(slugOrId)
          );
          setItem(found || null);
          setState(found ? "success" : "error");
        }
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [slugOrId, preloaded]);

  const readingMins = useMemo(
    () => estimateReadingMinutes(item?.content_en || ""),
    [item]
  );
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  if (state === "loading") {
    return (
      <section className="px-5 md:px-10 py-10 bg-[#111922] text-[#e9c78a] min-h-screen">
        <div className="max-w-[1448px] mx-auto animate-pulse">
          <div className="h-10 w-1/2 bg-[#1a2432] rounded mb-6" />
          <div className="h-[360px] w-full bg-[#1a2432] rounded-2xl mb-6" />
          <div className="space-y-3">
            <div className="h-4 bg-[#1a2432] rounded w-11/12" />
            <div className="h-4 bg-[#1a2432] rounded w-10/12" />
            <div className="h-4 bg-[#1a2432] rounded w-9/12" />
          </div>
        </div>
      </section>
    );
  }

  if (state === "error" || !item) {
    return (
      <section className="px-5 md:px-10 py-10 bg-[#111922] text-[#e9c78a] min-h-screen">
        <div className="max-w-[1448px] mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">News</h1>
          <div className="bg-[#1a2432] rounded-2xl p-8">
            <p className="opacity-90">Sorry, we couldn't find this article.</p>
            <div className="mt-6">
              <Link to="/news" className="underline hover:opacity-80">
                ← Back to News
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#111922] text-[#e9c78a] min-h-screen">
      {/* Hero */}
      <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title_en}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full max-w-[1448px] mx-auto px-5 md:px-10 flex items-end pb-8">
          <div>
            <p className="text-sm opacity-80 mb-2">
              {formatDate(item.date)} • {readingMins} min read
            </p>
            <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">
              {item.title_en}
            </h1>
            {item.tags?.length ? (
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full bg-[#111922] text-[#e9c78a] border border-[#e9c78a]/20"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 md:px-10 py-10">
        <div className="max-w-[960px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/news" className="underline hover:opacity-80">
              ← Back to News
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <ShareButton
                label="Copy link"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(shareUrl);
                    alert("Link copied!");
                  } catch {
                    window.prompt("Copy this URL:", shareUrl);
                  }
                }}
              />
              <a
                className="underline hover:opacity-80"
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  shareUrl
                )}&text=${encodeURIComponent(item.title_en)}`}
                target="_blank"
                rel="noreferrer"
              >
                Share on X
              </a>
              <a
                className="underline hover:opacity-80"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
              <a
                className="underline hover:opacity-80"
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  shareUrl
                )}&title=${encodeURIComponent(item.title_en)}`}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Description (lead) */}
          {item.description_en && (
            <p className="text-lg opacity-90 bg-[#1a2432] p-5 rounded-2xl mb-6">
              {item.description_en}
            </p>
          )}

          {/* Content paragraphs */}
          <article className="prose prose-invert max-w-none">
            {item.content_en
              .split(/\n\n+/)
              .filter(Boolean)
              .map((para, i) => (
                <p key={i} className="leading-7 opacity-95">
                  {para}
                </p>
              ))}
          </article>
        </div>
      </div>
    </section>
  );
}

function ShareButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="underline hover:opacity-80"
      type="button"
    >
      {label}
    </button>
  );
}
