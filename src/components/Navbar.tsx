// src/components/Navbar.tsx
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useSearchIndex } from "../hooks/useSearchIndex"; // pages (MENU) + gallery (API) üçün

export default function Navbar() {
  const [open, setOpen] = useState(false); // mobil menyu
  const [searchOpen, setSearchOpen] = useState(false); // axtarış paneli
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { totalItems } = useCart();
  const navigate = useNavigate();

  // Pages + Gallery dataları (MENU statik + məhsullar backend-dən)
  const { pages, gallery, loading } = useSearchIndex();

  // "/" açır, "Esc" bağlayır (inputda deyilsə)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const inField =
        tag === "input" ||
        tag === "textarea" ||
        (e.target as HTMLElement)?.isContentEditable;

      if (!inField && e.key === "/") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Panel açılınca inputa fokus ver
  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 0);
    else setQ("");
  }, [searchOpen]);

  const submitSearch = () => {
    const query = q.trim();
    setSearchOpen(false);
    if (query) navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  // Filter məntiqi
  const norm = (s: string) => s.toLowerCase().trim();
  const qq = norm(q);

  const filteredPages = qq
    ? pages.filter(
        (m) => norm(m.label).includes(qq) || norm(m.href).includes(qq)
      )
    : pages;

  const filteredGallery = qq
    ? gallery.filter((g) => {
        const inTitle = norm(g.title).includes(qq);
        const inTags = (g.tags || []).some((t) => norm(t).includes(qq));
        return inTitle || inTags;
      })
    : gallery.slice(0, 6); // boş axtarışda son işlərdən bir neçəsini göstər

  return (
    <header className="sticky top-0 z-50 bg-[#111922] text-[#e9c78a] border-b border-[#d9b8801a] h-[72px] md:h-[89px]">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 md:px-6">
        {/* SOL: Logo */}
        <a href="/" className="flex items-center h-full">
          <img
            src="/images/logoo.png"
            alt="Logo"
            className="h-10 md:h-[72px] w-auto"
          />
        </a>

        {/* SAĞ QRUP */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Menyu (yalnız md və yuxarı) */}
          <nav className="hidden md:flex items-center gap-8">
            {pages.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[#FFD8A2] text-sm xs940:text-[13px] font-inter font-normal uppercase py-2 text-center break-words hover:opacity-90 relative after:absolute after:left-0 md:after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#e9c78a] after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* İkonlar */}
          <div className="flex items-center gap-5">
            {/* Axtarış */}
            <button
              aria-label="Search"
              className="p-1 hover:opacity-90"
              title="Search"
              onClick={() => setSearchOpen((s) => !s)}
            >
              <svg
                width="23"
                height="33"
                viewBox="0 0 23 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5158 18.001H14.6466L14.3155 17.6699C15.4054 16.4697 16.0538 14.8418 16.0538 13.1036C16.0538 9.18559 12.8946 6.02637 8.97661 6.02637C5.05863 6.02637 1.89941 9.18559 1.89941 13.1036C1.89941 17.0215 5.05863 20.1808 8.97661 20.1808C10.7149 20.1808 12.3428 19.5324 13.543 18.4425L13.8741 18.7736V19.6427L19.3096 25.0782L20.9375 23.4503L15.5158 18.001ZM8.9904 18.001C6.27265 18.001 4.09293 15.8213 4.09293 13.1036C4.09293 10.3858 6.27265 8.20609 8.9904 8.20609C11.7082 8.20609 13.8879 10.3858 13.8879 13.1036C13.8741 15.8351 11.7082 18.001 8.9904 18.001Z"
                  fill="#FFD8A2"
                />
              </svg>
            </button>

            {/* Səbət */}
            <button
              aria-label="Cart"
              className="relative p-1 hover:opacity-90"
              title="Cart"
              onClick={() => navigate("/cart")}
            >
              <svg
                width="28"
                height="27"
                viewBox="0 0 28 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.8782 11.0751L17.3294 4.52625M23.8782 11.0751H4.23169M23.8782 11.0751L22.3972 18.4802C21.9891 20.5209 20.1972 21.9898 18.1161 21.9898H9.99383C7.91268 21.9898 6.12085 20.5209 5.7127 18.4802L4.23169 11.0751M4.23169 11.0751L10.7805 4.52625"
                  stroke="#FFD8A2"
                  strokeWidth="1.63721"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FFD8A2] text-[#121b25] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger (yalnız mobil) */}
            <button
              className="md:hidden p-1"
              aria-label="Menu"
              onClick={() => setOpen((s) => !s)}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
              >
                {open ? (
                  <path d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <>
                    <path d="M3 6h18" />
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobil menyu */}
      <div
        className={`md:hidden border-t border-[#d9b8801a] bg-[#0e151d] transition-[max-height] duration-300 ${
          open ? "max-h-96" : "max-h-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col gap-3 px-4 py-4">
          {pages.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-2 text-[13px] uppercase text-[#FFD8A2] hover:opacity-90"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* AXTARIŞ OVERLAY */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[1px]"
          onClick={() => setSearchOpen(false)}
          aria-hidden
        >
          <div
            className="mx-auto mt-24 w-[92%] max-w-2xl rounded-2xl border border-[#d9b8801a] bg-[#0e151d] p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            {/* Input */}
            <div className="flex items-center gap-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="shrink-0"
              >
                <path
                  d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15a7.5 7.5 0 0 1 0 15Z"
                  stroke="#FFD8A2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitSearch()}
                placeholder="Search pages & gallery… (Esc to close)"
                className="w-full bg-transparent outline-none text-[#FFD8A2] placeholder:text-[#FFD8A299]"
              />
              <button
                className="text-[#FFD8A2] hover:opacity-90 text-sm px-2 py-1 rounded-md border border-[#d9b8801a]"
                onClick={submitSearch}
              >
                Search
              </button>
            </div>

            {/* Nəticələr */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-80 overflow-auto">
              {/* Pages */}
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#FFD8A280] mb-1">
                  Pages
                </div>
                {filteredPages.length === 0 ? (
                  <div className="text-sm text-[#FFD8A299] px-1 py-2">
                    No page match.
                  </div>
                ) : (
                  <ul className="divide-y divide-[#d9b8801a]">
                    {filteredPages.map((m) => (
                      <li key={m.href}>
                        <a
                          href={m.href}
                          className="flex items-center justify-between px-2 py-2 hover:bg-[#121b25] rounded-md"
                          onClick={() => setSearchOpen(false)}
                        >
                          <span className="text-[#FFD8A2] text-sm">
                            {m.label}
                          </span>
                          <span className="text-[11px] text-[#FFD8A280]">
                            {m.href}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Gallery */}
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#FFD8A280] mb-1">
                  Gallery {loading ? "(loading…)" : ""}
                </div>
                {filteredGallery.length === 0 ? (
                  <div className="text-sm text-[#FFD8A299] px-1 py-2">
                    No gallery match.
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {filteredGallery.map((g) => (
                      <li key={g.id}>
                        <button
                          onClick={() => {
                            setSearchOpen(false);
                            // səndə route fərqli ola bilər: /gallery/:id və ya :slug
                            navigate(`/products/${g.id}`);
                          }}
                          className="w-full text-left px-2 py-2 hover:bg-[#121b25] rounded-md flex items-center gap-3"
                        >
                          {g.thumb && (
                            <img
                              src={g.thumb}
                              alt={g.title}
                              className="h-8 w-8 object-cover rounded-md border border-[#d9b8801a]"
                              loading="lazy"
                            />
                          )}
                          <div className="min-w-0">
                            <div className="text-[#FFD8A2] text-sm truncate">
                              {g.title}
                            </div>
                            {g.tags?.length ? (
                              <div className="text-[11px] text-[#FFD8A280] truncate">
                                {g.tags.slice(0, 4).join(" · ")}
                                {g.tags.length > 4 ? "…" : ""}
                              </div>
                            ) : null}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="mt-3 flex items-center justify-between text-[11px] text-[#FFD8A280]">
              <span>Tip: “/” opens, “Esc” closes</span>
              <button
                className="underline hover:opacity-90"
                onClick={() => {
                  setQ("");
                  inputRef.current?.focus();
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
