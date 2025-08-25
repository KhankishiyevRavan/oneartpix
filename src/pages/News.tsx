// src/pages/News.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type NewsItem = {
  id: string | number;
  title_en: string;
  description_en: string;
  date: string; // e.g. "August 25, 2025"
  image: string; // public path or CDN URL
  slug?: string; // optional for routing like /news/slug
  tags?: string[];
};

// type FetchState = "idle" | "loading" | "success" | "error";

// ---- Mock data (remove if you fetch from API) ----
const MOCK_NEWS: NewsItem[] = [
  {
    id: 1,
    title_en: "Onepixart unveils a fresh design language",
    description_en:
      "Onepixart introduces a modern visual system focused on clarity, contrast, and motion—optimized for high‑impact portfolios and content‑heavy layouts.",
    date: "August 25, 2025",
    image: "/images/news/news1.jpg",
    tags: ["Design", "Onepixart", "Update"],
    slug: "onepixart-unveils-fresh-design",
  },
  {
    id: 2,
    title_en: "UI/UX trends shaping the next quarter",
    date: "August 20, 2025",
    image: "/images/news/news2.jpg",
    description_en:
      "From micro‑interactions to accessible color systems, here are the practical trends that will actually ship in production.",
    tags: ["UI/UX", "Trends"],
    slug: "ui-ux-trends-next-quarter",
  },
  {
    id: 3,
    title_en: "Performance checklist for React + Tailwind apps",
    date: "August 15, 2025",
    image: "/images/news/news3.jpg",
    description_en:
      "Minify images, prefetch routes, lazy‑load modals—this quick checklist helps your pages hit great Lighthouse scores.",
    tags: ["Frontend", "Performance"],
    slug: "performance-checklist-react-tailwind",
  },
];

// ---- Page ----
export default function NewsPage() {
  const navigate = useNavigate();
  // const [state, setState] = useState<FetchState>("idle");
  const [items] = useState<NewsItem[]>(MOCK_NEWS); // replace with [] if fetching
  // const [selected, setSelected] = useState<NewsItem | null>(null);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("All");

  // ---- Example: fetch from API (uncomment and set your URL) ----
  // useEffect(() => {
  //   setState("loading");
  //   fetch(import.meta.env.VITE_API_URL + "/api/news?lang=en")
  //     .then((r) => r.json())
  //     .then((data: { items: NewsItem[] }) => {
  //       setItems(data.items || []);
  //       setState("success");
  //     })
  //     .catch(() => setState("error"));
  // }, []);

  const allTags = useMemo(() => {
    const t = new Set<string>();
    items.forEach((n) => (n.tags || []).forEach((x) => t.add(x)));
    return ["All", ...Array.from(t)];
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((n) => {
      const q = query.trim().toLowerCase();
      const matchesText =
        !q ||
        n.title_en.toLowerCase().includes(q) ||
        n.description_en.toLowerCase().includes(q);
      const matchesTag = tag === "All" || (n.tags || []).includes(tag);
      return matchesText && matchesTag;
    });
  }, [items, query, tag]);

  return (
    <section className="px-5 md:px-10 py-10 bg-[#111922] text-[#e9c78a] min-h-screen">
      <div className="max-w-[1448px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 border-b border-[#d9b8801a] pb-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">News</h1>
            <p className="opacity-80 mt-2">
              Latest updates, releases, and insights from Onepixart.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="search"
              placeholder="Search news…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-[#1a2432] text-[#e9c78a] rounded-xl px-4 py-2 outline-none border border-transparent focus:border-[#e9c78a]/30"
            />
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="bg-[#1a2432] text-[#e9c78a] rounded-xl px-4 py-2 outline-none border border-transparent focus:border-[#e9c78a]/30"
            >
              {allTags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main list */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* {state === "error" && (
              <div className="bg-[#1a2432] rounded-2xl p-6">
                Failed to load news. Please try again.
              </div>
            )} */}
            {filtered.map((news) => (
              <article
                key={news.id}
                className="bg-[#1a2432] rounded-2xl overflow-hidden shadow-md"
                onClick={() => navigate(`/news/${news.slug || news.id}`)}
              >
                <button
                  // onClick={() => setSelected(news)}
                  className="text-left w-full"
                >
                  <img
                    src={news.image}
                    alt={news.title_en}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                      {news.title_en}
                    </h2>
                    <p className="text-sm opacity-70 mb-3">{news.date}</p>
                    <p className="opacity-90 line-clamp-3">
                      {news.description_en}
                    </p>
                  </div>
                </button>
                <div className="px-6 pb-6">
                  <div className="flex flex-wrap gap-2">
                    {(news.tags || []).map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded-full bg-[#111922] border border-[#e9c78a]/20"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <div className="bg-[#1a2432] rounded-2xl p-6">
                No news found for your filters.
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="bg-[#1a2432] rounded-2xl p-6 h-fit">
            <h3 className="text-xl font-bold mb-4">Latest News</h3>
            <ul className="flex flex-col gap-4">
              {items.slice(0, 6).map((news) => (
                <li
                  key={`side-${news.id}`}
                  className="flex items-center gap-3 cursor-pointer hover:opacity-80"
                  onClick={() => navigate(`/news/${news.slug || news.id}`)}
                >
                  <img
                    src={news.image}
                    alt={news.title_en}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium line-clamp-2">
                      {news.title_en}
                    </p>
                    <span className="text-xs opacity-70">{news.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
