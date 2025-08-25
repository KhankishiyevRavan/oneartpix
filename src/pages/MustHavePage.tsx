// src/pages/MustHave.tsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Category = "All" | "Prints" | "Presets" | "Gear" | "Books" | "Apps";

type Item = {
  id: string | number;
  title_en: string;
  subtitle_en?: string;
  image: string;
  category: Exclude<Category, "All">;
  price?: string; // e.g. "$29", "Free", "From $99"
  url?: string; // external or internal /product/slug
  badge?: "Best Seller" | "Editor’s Pick" | "New";
  tags?: string[];
  popularScore?: number; // for sorting by popularity
};

const CATEGORIES: Category[] = [
  "All",
  "Prints",
  "Presets",
  "Gear",
  "Books",
  "Apps",
];

const ITEMS: Item[] = [
  {
    id: 1,
    title_en: "Monochrome Mountains – Fine Art Print",
    subtitle_en: "Archival matte | 30×40 / 50×70",
    image: "/images/musthave/have1.jpg",
    category: "Prints",
    price: "From $79",
    badge: "Best Seller",
    tags: ["Fine Art", "Black & White"],
    popularScore: 98,
    url: "/must-have/monochrome-mountains",
  },
  {
    id: 2,
    title_en: "Cinematic Portrait Presets (Lightroom)",
    subtitle_en: "10 LUT-inspired presets for clean skin tones",
    image: "/images/musthave/have2.jpg",
    category: "Presets",
    price: "$29",
    badge: "Editor’s Pick",
    tags: ["Lightroom", "Skin Tones"],
    popularScore: 91,
    url: "/must-have/cinematic-portraits",
  },
  {
    id: 3,
    title_en: "Travel Prime Lens 35mm f/1.8",
    subtitle_en: "Lightweight, razor-sharp, budget-friendly",
    image: "/images/musthave/have3.jpg",
    category: "Gear",
    price: "From $199",
    tags: ["Travel", "Prime"],
    popularScore: 87,
    url: "https://example-gear.com/35mm", // affiliate or external
  },
  {
    id: 4,
    title_en: "The Visual Story",
    subtitle_en: "Bruce Block — composition, color, contrast",
    image: "/images/musthave/have4.jpg",
    category: "Books",
    price: "$24",
    tags: ["Composition", "Color"],
    popularScore: 80,
    url: "https://bookstore.example/the-visual-story",
  },
  {
    id: 5,
    title_en: "SnapEdit – Quick Background Cleanup",
    subtitle_en: "One-click removals for socials",
    image: "/images/musthave/have5.jpg",
    category: "Apps",
    price: "Free",
    tags: ["Retouch", "Social"],
    popularScore: 74,
    url: "https://apps.example/snapedit",
  },
  {
    id: 6,
    title_en: "Desert Dunes – Fine Art Print",
    subtitle_en: "Hahnemühle Photo Rag | 40×60",
    image: "/images/musthave/have6.jpg",
    category: "Prints",
    price: "From $99",
    tags: ["Fine Art", "Landscape"],
    popularScore: 85,
    url: "/must-have/desert-dunes",
  },
];

type SortKey =
  | "Featured"
  | "Price: Low → High"
  | "Price: High → Low"
  | "Popular";

export default function MustHavePage() {
  const [active, setActive] = useState<Category>("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("Featured");

  const filtered = useMemo(() => {
    const list = ITEMS.filter((it) => {
      const text = (
        it.title_en +
        " " +
        (it.subtitle_en || "") +
        " " +
        (it.tags || []).join(" ")
      ).toLowerCase();
      const matchesText = !q.trim() || text.includes(q.trim().toLowerCase());
      const matchesCat = active === "All" ? true : it.category === active;
      return matchesText && matchesCat;
    });

    const parsePrice = (p?: string) => {
      if (!p) return NaN;
      // handle "$29", "From $79", "Free"
      if (/free/i.test(p)) return 0;
      const m = p.match(/\$([0-9]+(\.[0-9]+)?)/);
      return m ? parseFloat(m[1]) : NaN;
    };

    switch (sort) {
      case "Price: Low → High":
        return [...list].sort(
          (a, b) =>
            (parsePrice(a.price) || 999999) - (parsePrice(b.price) || 999999)
        );
      case "Price: High → Low":
        return [...list].sort(
          (a, b) => (parsePrice(b.price) || -1) - (parsePrice(a.price) || -1)
        );
      case "Popular":
        return [...list].sort(
          (a, b) => (b.popularScore || 0) - (a.popularScore || 0)
        );
      default:
        return list; // Featured (original order)
    }
  }, [active, q, sort]);

  return (
    <section className="bg-[#111922] text-[#e9c78a] min-h-screen">
      {/* Hero */}
      <div className="px-5 md:px-10 pt-10">
        <div className="max-w-[1448px] mx-auto border-b border-[#d9b8801a] pb-6">
          <h1 className="text-3xl md:text-5xl font-bold">Must-Have</h1>
          <p className="opacity-80 mt-2">
            Curated essentials I rely on: fine-art prints, portrait presets,
            dependable gear, and creative tools.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="px-5 md:px-10 sticky top-[89px] z-30 bg-[#111922]/90 backdrop-blur border-b border-[#d9b8801a]">
        <div className="max-w-[1448px] mx-auto py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-3 py-1.5 rounded-full border transition ${
                  active === c
                    ? "bg-[#1a2432] border-[#e9c78a]/40"
                    : "bg-transparent border-[#e9c78a]/20 hover:border-[#e9c78a]/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="search"
              placeholder="Search essentials…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="bg-[#1a2432] text-[#e9c78a] rounded-xl px-4 py-2 outline-none border border-transparent focus:border-[#e9c78a]/30 w-full md:w-64"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-[#1a2432] text-[#e9c78a] rounded-xl px-4 py-2 outline-none border border-transparent focus:border-[#e9c78a]/30"
            >
              <option>Featured</option>
              <option>Price: Low → High</option>
              <option>Price: High → Low</option>
              <option>Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-5 md:px-10 py-8">
        <div className="max-w-[1448px] mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
          {filtered.map((it) => (
            <article
              key={it.id}
              className="bg-[#1a2432] rounded-2xl overflow-hidden shadow-md"
            >
              <div className="relative">
                <img
                  src={it.image}
                  alt={it.title_en}
                  className="w-full h-64 object-cover"
                />
                {it.badge && (
                  <span className="absolute top-3 left-3 text-xs bg-[#111922] border border-[#e9c78a]/30 px-2 py-1 rounded-full">
                    {it.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold line-clamp-2">
                  {it.title_en}
                </h3>
                {it.subtitle_en && (
                  <p className="opacity-80 text-sm mt-1 line-clamp-2">
                    {it.subtitle_en}
                  </p>
                )}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm opacity-90">{it.price || "—"}</span>
                  <span className="text-xs opacity-70">{it.category}</span>
                </div>
                {it.tags?.length ? (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {it.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded-full bg-[#111922] border border-[#e9c78a]/20"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-5">
                  {it.url?.startsWith("/") ? (
                    <Link
                      to={it.url}
                      className="inline-flex items-center gap-2 underline hover:opacity-80"
                    >
                      Learn more →
                    </Link>
                  ) : it.url ? (
                    <a
                      href={it.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 underline hover:opacity-80"
                    >
                      Learn more →
                    </a>
                  ) : (
                    <span className="text-sm opacity-70">
                      Details coming soon
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="max-w-[1448px] mx-auto bg-[#1a2432] p-8 rounded-2xl">
            No items match your filters.
          </div>
        )}
      </div>

      {/* Starter Kits */}
      <div className="px-5 md:px-10 pb-10">
        <div className="max-w-[1448px] mx-auto bg-[#1a2432] rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-3">Starter Kits</h2>
          <p className="opacity-80 mb-4">
            Quick bundles I recommend to get up and running fast.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Beginner Photography Kit",
              "Travel & Street Kit",
              "Portrait Color-Grading Kit",
              "Social Media Speed Kit",
            ].map((k) => (
              <span
                key={k}
                className="text-sm px-3 py-1.5 rounded-full bg-[#111922] border border-[#e9c78a]/20"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Print Size Guide + FAQ */}
      <div className="px-5 md:px-10 pb-16">
        <div className="max-w-[1448px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#1a2432] rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">Print Size Guide</h3>
            <table className="w-full text-sm">
              <thead className="text-left opacity-80">
                <tr>
                  <th className="py-2">Size</th>
                  <th className="py-2">Recommended Room</th>
                  <th className="py-2">Aspect</th>
                </tr>
              </thead>
              <tbody className="[&>tr:nth-child(even)]:bg-[#111922]">
                <tr>
                  <td className="py-2">30×40 cm</td>
                  <td>Desk / Entry</td>
                  <td>3:4</td>
                </tr>
                <tr>
                  <td className="py-2">40×60 cm</td>
                  <td>Bedroom</td>
                  <td>2:3</td>
                </tr>
                <tr>
                  <td className="py-2">50×70 cm</td>
                  <td>Living room</td>
                  <td>5:7</td>
                </tr>
                <tr>
                  <td className="py-2">60×90 cm</td>
                  <td>Feature wall</td>
                  <td>2:3</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#1a2432] rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">FAQ</h3>
            <details className="mb-3">
              <summary className="cursor-pointer">
                Do presets work on mobile?
              </summary>
              <p className="mt-2 opacity-80">
                Yes. They include DNG files for Lightroom Mobile and .xmp for
                desktop.
              </p>
            </details>
            <details className="mb-3">
              <summary className="cursor-pointer">
                What paper do you use for prints?
              </summary>
              <p className="mt-2 opacity-80">
                Archival matte (Hahnemühle Photo Rag or equivalent),
                museum-grade inks.
              </p>
            </details>
            <details>
              <summary className="cursor-pointer">Shipping & returns</summary>
              <p className="mt-2 opacity-80">
                Prints ship in 5–7 business days. Defects/damage replaced free
                of charge.
              </p>
            </details>
          </div>
        </div>

        {/* Disclosure (optional) */}
        <p className="text-xs opacity-60 mt-6 max-w-[1448px] mx-auto">
          Some links may be affiliate links. I recommend only what I use and
          love. This doesn’t affect your price.
        </p>
      </div>
    </section>
  );
}
