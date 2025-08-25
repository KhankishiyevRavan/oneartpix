import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

/**
 * Must‑Have Item Detail — Onepixart‑style
 * - Works with slug or id in route: /must-have/:slugOrId
 * - Accepts preloaded item via route state (from the listing page)
 * - Tries API (VITE_API_URL) then falls back to MOCK_ITEMS
 * - Category‑specific sections (Prints, Presets, Gear, Books, Apps)
 * - SEO: JSON‑LD Product schema
 */

type Category = "Prints" | "Presets" | "Gear" | "Books" | "Apps";

type Item = {
  id: string | number;
  slug: string;
  title_en: string;
  subtitle_en?: string;
  category: Category;
  image: string; // hero
  gallery?: string[]; // optional extra images
  price?: string; // e.g. "$29", "From $79", "Free"
  url?: string; // external or internal for buy/download
  badge?: "Best Seller" | "Editor’s Pick" | "New";
  tags?: string[];
  popularScore?: number;
  content_en?: string; // long description, \n\n separated paragraphs
  // Optional category‑specific fields
  print?: {
    paper?: string;
    sizes?: string[]; // e.g. ["30×40 cm", "50×70 cm"]
    finish?: string; // e.g. "Matte"
    shippingNote?: string;
  };
  preset?: {
    includes?: string[]; // e.g. ["10 presets", "DNG (mobile)", ".xmp (desktop)"]
    compatibility?: string[]; // e.g. ["Lightroom Classic", "Lightroom Mobile", "ACR"]
  };
  gear?: {
    brand?: string;
    specs?: Record<string, string>; // e.g. { "Focal length": "35mm" }
  };
  book?: {
    author?: string;
    pages?: number;
    isbn?: string;
    keyTakeaways?: string[];
  };
  app?: {
    platforms?: string[]; // e.g. ["iOS", "Android", "Web"]
    features?: string[];
  };
};

const MOCK_ITEMS: Item[] = [
  {
    id: 1,
    slug: "monochrome-mountains-fine-art-print",
    title_en: "Monochrome Mountains – Fine Art Print",
    subtitle_en: "Archival matte | 30×40 / 50×70",
    category: "Prints",
    image: "/images/musthave/have1.jpg",
    gallery: [
      "/images/musthave/detail/print1.png",
      "/images/musthave/detail/print1b.png",
      "/images/musthave/detail/print1c.png",
    ],
    price: "From $79",
    url: "/must-have/monochrome-mountains",
    badge: "Best Seller",
    tags: ["Fine Art", "Black & White"],
    content_en:
      "Museum‑grade, archival print that brings quiet drama to your space. Each print is checked for tonal depth and crisp detail.",
    print: {
      paper: "Hahnemühle Photo Rag (archival matte)",
      finish: "Matte",
      sizes: ["30×40 cm", "40×60 cm", "50×70 cm", "60×90 cm"],
      shippingNote: "Ships in 5–7 business days, rolled in protective tube.",
    },
  },
  {
    id: 2,
    slug: "cinematic-portrait-presets-lightroom",
    title_en: "Cinematic Portrait Presets (Lightroom)",
    subtitle_en: "10 LUT‑inspired presets for clean skin tones",
    category: "Presets",
    image: "/images/musthave/have2.jpg",
    price: "$29",
    url: "/must-have/cinematic-portraits",
    badge: "Editor’s Pick",
    tags: ["Lightroom", "Skin Tones"],
    content_en:
      "A set of portrait‑first presets that keep skin tones natural while adding cinematic contrast.",
    preset: {
      includes: [
        "10 presets",
        "DNG (mobile)",
        ".xmp (desktop)",
        "Quick install guide",
      ],
      compatibility: [
        "Lightroom Classic",
        "Lightroom CC",
        "Lightroom Mobile",
        "Adobe Camera Raw",
      ],
    },
  },
  {
    id: 3,
    slug: "travel-prime-lens-35mm-f18",
    title_en: "Travel Prime Lens 35mm f/1.8",
    subtitle_en: "Lightweight, razor‑sharp, budget‑friendly",
    category: "Gear",
    image: "/images/musthave/gear1.jpg",
    price: "From $199",
    url: "https://example-gear.com/35mm",
    tags: ["Travel", "Prime"],
    content_en:
      "My go‑to street and travel focal length. Fast enough for low light and bokeh, wide enough for context.",
    gear: {
      brand: "Acme Optics",
      specs: {
        "Focal length": "35mm",
        Aperture: "f/1.8",
        Weight: "280g",
        "Filter thread": "52mm",
        Mounts: "EF/FE/Z/R/F",
      },
    },
  },
  {
    id: 4,
    slug: "the-visual-story",
    title_en: "The Visual Story",
    subtitle_en: "Bruce Block — composition, color, contrast",
    category: "Books",
    image: "/images/musthave/book1.jpg",
    price: "$24",
    url: "https://bookstore.example/the-visual-story",
    tags: ["Composition", "Color"],
    content_en:
      "A foundational resource on visual structure—how composition and color choices shape audience emotion.",
    book: {
      author: "Bruce Block",
      pages: 312,
      isbn: "978-0-240-80679-8",
      keyTakeaways: [
        "Use contrast to direct attention",
        "Unify scenes with visual tone",
        "Balance simplicity and complexity",
      ],
    },
  },
  {
    id: 5,
    slug: "snapedit-quick-background-cleanup",
    title_en: "SnapEdit – Quick Background Cleanup",
    subtitle_en: "One‑click removals for socials",
    category: "Apps",
    image: "/images/musthave/app1.jpg",
    price: "Free",
    url: "https://apps.example/snapedit",
    tags: ["Retouch", "Social"],
    content_en:
      "Handy for product shots and profile pics when you need backgrounds gone—fast.",
    app: {
      platforms: ["Web", "iOS", "Android"],
      features: ["Auto subject detection", "Batch mode", "Simple export"],
    },
  },
  {
    id: 6,
    slug: "desert-dunes-fine-art-print",
    title_en: "Desert Dunes – Fine Art Print",
    subtitle_en: "Hahnemühle Photo Rag | 40×60",
    category: "Prints",
    image: "/images/musthave/print2.jpg",
    price: "From $99",
    url: "/must-have/desert-dunes",
    tags: ["Fine Art", "Landscape"],
    content_en: "Waves of light and shadow—minimal yet rich in texture.",
    print: {
      paper: "Hahnemühle Photo Rag",
      finish: "Matte",
      sizes: ["40×60 cm", "50×75 cm", "60×90 cm"],
      shippingNote: "Packed flat for smaller sizes; larger sizes ship rolled.",
    },
  },
];

type FetchState = "idle" | "loading" | "success" | "error";

function formatPrice(p?: string) {
  return p || "—";
}

function isExternal(url?: string) {
  return !!url && /^(https?:)?\/\//i.test(url);
}

export default function MustHaveDetail() {
  const { slugOrId } = useParams<{ slugOrId: string }>();
  const location = useLocation();
  const preloaded: Item | undefined = (location.state as any)?.item;

  const [state, setState] = useState<FetchState>(
    preloaded ? "success" : "idle"
  );
  const [item, setItem] = useState<Item | null>(preloaded || null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      console.log(slugOrId);

      if (!slugOrId || preloaded) return;
      console.log("tes");
      
      try {
        setState("loading");
        const apiBase = (import.meta as any)?.env?.VITE_API_URL;
        if (apiBase) {
          const res = await fetch(
            `${apiBase}/api/musthave/${encodeURIComponent(slugOrId)}?lang=en`
          );
          if (!cancelled && res.ok) {
            const data = (await res.json()) as { item?: Item };
            if (data?.item) {
              setItem(data.item);
              setState("success");
              return;
            }
          }
        }
        if (!cancelled) {
          const found = MOCK_ITEMS.find(
            (n) => n.url?.slice(11) == slugOrId || String(n.id) === String(slugOrId)
          );
          console.log(found);
          
          setItem(found || null);
          setState(found ? "success" : "error");
        }
      } catch {
        if (!cancelled) {
          const found = MOCK_ITEMS.find(
            (n) => n.url == slugOrId || String(n.id) === String(slugOrId)
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
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Must‑Have</h1>
          <div className="bg-[#1a2432] rounded-2xl p-8">
            <p className="opacity-90">Sorry, we couldn't find this item.</p>
            <div className="mt-6">
              <Link to="/must-have" className="underline hover:opacity-80">
                ← Back to Must‑Have
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
              {item.category} • {formatPrice(item.price)}
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
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            {item.gallery?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {item.gallery.map((g, i) => (
                  <img
                    key={i}
                    src={g}
                    alt={`${item.title_en} ${i + 1}`}
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                ))}
              </div>
            ) : null}

            {/* Lead */}
            {item.subtitle_en && (
              <p className="text-lg opacity-90 bg-[#1a2432] p-5 rounded-2xl mb-6">
                {item.subtitle_en}
              </p>
            )}

            {/* Long content */}
            {item.content_en && (
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
            )}

            {/* Category‑specific sections */}
            <div className="mt-8 space-y-6">
              {item.category === "Prints" && item.print && (
                <section className="bg-[#1a2432] rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3">Print details</h3>
                  <ul className="text-sm space-y-1">
                    {item.print.paper && (
                      <li>
                        <strong>Paper:</strong> {item.print.paper}
                      </li>
                    )}
                    {item.print.finish && (
                      <li>
                        <strong>Finish:</strong> {item.print.finish}
                      </li>
                    )}
                    {item.print.sizes?.length && (
                      <li>
                        <strong>Sizes:</strong> {item.print.sizes.join(", ")}
                      </li>
                    )}
                  </ul>
                  {item.print.shippingNote && (
                    <p className="text-sm opacity-80 mt-3">
                      {item.print.shippingNote}
                    </p>
                  )}
                </section>
              )}

              {item.category === "Presets" && item.preset && (
                <section className="bg-[#1a2432] rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3">What’s included</h3>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    {(item.preset.includes || []).map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  {item.preset.compatibility?.length ? (
                    <p className="text-sm opacity-80 mt-3">
                      <strong>Compatibility:</strong>{" "}
                      {item.preset.compatibility.join(", ")}
                    </p>
                  ) : null}
                </section>
              )}

              {item.category === "Gear" && item.gear && (
                <section className="bg-[#1a2432] rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3">Tech specs</h3>
                  <ul className="text-sm space-y-1">
                    {item.gear.brand && (
                      <li>
                        <strong>Brand:</strong> {item.gear.brand}
                      </li>
                    )}
                    {item.gear.specs &&
                      Object.entries(item.gear.specs).map(([k, v]) => (
                        <li key={k}>
                          <strong>{k}:</strong> {v}
                        </li>
                      ))}
                  </ul>
                </section>
              )}

              {item.category === "Books" && item.book && (
                <section className="bg-[#1a2432] rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3">Book info</h3>
                  <ul className="text-sm space-y-1">
                    {item.book.author && (
                      <li>
                        <strong>Author:</strong> {item.book.author}
                      </li>
                    )}
                    {item.book.pages && (
                      <li>
                        <strong>Pages:</strong> {item.book.pages}
                      </li>
                    )}
                    {item.book.isbn && (
                      <li>
                        <strong>ISBN:</strong> {item.book.isbn}
                      </li>
                    )}
                  </ul>
                  {item.book.keyTakeaways?.length ? (
                    <div className="mt-3">
                      <div className="text-sm font-semibold mb-1">
                        Key takeaways
                      </div>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        {item.book.keyTakeaways.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </section>
              )}

              {item.category === "Apps" && item.app && (
                <section className="bg-[#1a2432] rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3">App details</h3>
                  {item.app.platforms?.length ? (
                    <p className="text-sm">
                      <strong>Platforms:</strong>{" "}
                      {item.app.platforms.join(", ")}
                    </p>
                  ) : null}
                  {item.app.features?.length ? (
                    <ul className="text-sm list-disc pl-5 space-y-1 mt-2">
                      {item.app.features.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              )}
            </div>

            {/* Disclaimer for affiliate links */}
            {isExternal(item.url) && (
              <p className="text-xs opacity-60 mt-6">
                Some links may be affiliate links. I recommend only what I use
                and love. This doesn’t affect your price.
              </p>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-[#1a2432] rounded-2xl p-6 sticky top-[120px]">
              <div className="text-sm opacity-80">{item.category}</div>
              <div className="text-2xl font-semibold mt-1">
                {formatPrice(item.price)}
              </div>

              <div className="mt-4 flex flex-col gap-3">
                {item.url ? (
                  isExternal(item.url) ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:opacity-80"
                    >
                      {item.category === "Presets" || item.category === "Apps"
                        ? "Download / Buy"
                        : "Buy now"}
                    </a>
                  ) : (
                    <Link to={item.url} className="underline hover:opacity-80">
                      {item.category === "Presets" || item.category === "Apps"
                        ? "Download / Buy"
                        : "Buy now"}
                    </Link>
                  )
                ) : (
                  <span className="text-sm opacity-70">
                    Purchase link coming soon
                  </span>
                )}
                <Link to="/must-have" className="underline hover:opacity-80">
                  ← Back to Must‑Have
                </Link>
              </div>

              {/* Share */}
              <div className="mt-6 border-t border-[#e9c78a]/10 pt-4 text-sm flex flex-col gap-2">
                <button
                  type="button"
                  className="underline hover:opacity-80 text-left"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(shareUrl);
                      alert("Link copied!");
                    } catch {
                      window.prompt("Copy this URL:", shareUrl);
                    }
                  }}
                >
                  Copy link
                </button>
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
          </aside>
        </div>
      </div>
    </section>
  );
}
