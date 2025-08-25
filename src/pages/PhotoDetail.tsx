// src/pages/PhotoDetail.tsx
import { useLocation, useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { heroSlides, type Slide } from "../data/heroSlides";

export default function PhotoDetail() {
  const { id } = useParams<{ id: string }>();
  const preloaded: Slide | undefined = (useLocation().state as any)?.slide;

  const item = useMemo<Slide | undefined>(() => {
    if (preloaded) return preloaded;
    return heroSlides.find((s) => s.id === id);
  }, [id, preloaded]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  if (!item) {
    return (
      <section className="px-5 md:px-10 py-10 bg-[#111922] text-[#e9c78a] min-h-screen">
        <div className="max-w-[1448px] mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Gallery</h1>
          <div className="bg-[#1a2432] rounded-2xl p-8">
            <p className="opacity-90">Sorry, we couldn’t find this photo.</p>
            <Link
              to="/"
              className="underline hover:opacity-80 mt-4 inline-block"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#111922] text-[#e9c78a] min-h-screen">
      {/* Hero */}
      <div className="relative h-[48vh] min-h-[300px] w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 h-full max-w-[1448px] mx-auto px-5 md:px-10 flex items-end pb-8">
          <div>
            <p className="text-sm opacity-80 mb-2">
              {item.location ? `${item.location} • ` : ""}
              {item.date ?? ""}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold">{item.title}</h1>
            {item.tags?.length ? (
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full bg-[#111922] border border-[#e9c78a]/20"
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
          <article className="lg:col-span-2">
            <p className="text-lg opacity-90 bg-[#1a2432] p-5 rounded-2xl mb-6">
              {item.description}
            </p>
            {item.content && (
              <div className="prose prose-invert max-w-none">
                {item.content.split(/\n\n+/).map((p, i) => (
                  <p key={i} className="opacity-95 leading-7">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside>
            <div className="bg-[#1a2432] rounded-2xl p-6 sticky top-[120px]">
              <div className="space-y-1 text-sm opacity-90">
                {item.location && (
                  <div>
                    <strong>Location:</strong> {item.location}
                  </div>
                )}
                {item.date && (
                  <div>
                    <strong>Date:</strong> {item.date}
                  </div>
                )}
                {item.tags?.length ? (
                  <div>
                    <strong>Tags:</strong> {item.tags.join(", ")}
                  </div>
                ) : null}
              </div>

              <div className="mt-5 border-t border-[#e9c78a]/10 pt-4 text-sm flex flex-col gap-2">
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
                  )}&text=${encodeURIComponent(item.title)}`}
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
                  )}&title=${encodeURIComponent(item.title)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>

                <Link to="/" className="underline hover:opacity-80 mt-3">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            name: item.title,
            caption: item.description,
            contentUrl: item.image,
            datePublished: item.date,
            keywords: (item.tags || []).join(", "),
          }),
        }}
      />
    </section>
  );
}
