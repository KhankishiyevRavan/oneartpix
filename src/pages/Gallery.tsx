import { useMemo, useState } from "react";
import GalleryFilters from "../components/GalleryFilters";
import Products from "../components/Products";

type Product = {
  id: string;
  image: string;
  category: string;
  location: string;
  title: string;
  // optional: createdAt, price və s. gələcəkdə sort üçün əlavə edə bilərsən
};

const ALL_PRODUCTS: Product[] = [
  {
    id: "1",
    image: "/images/product1.png",
    category: "Travel & Culture",
    location: "Europe",
    title: "Uvita Greda",
  },
  {
    id: "2",
    image: "/images/product2.png",
    category: "Art & Creation",
    location: "Abstract & Textures",
    title: "Veins of Vitality",
  },
  {
    id: "3",
    image: "/images/product3.png",
    category: "Nature & Landscapes",
    location: "Africa",
    title: "Silueta al Atardecer",
  },
  {
    id: "4",
    image: "/images/product4.png",
    category: "Black & White",
    location: "Europe",
    title: "Triton’s Guardians",
  },
  {
    id: "5",
    image: "/images/product5.png",
    category: "Vintage",
    location: "Fine Art",
    title: "Keys To Nostalgia",
  },
  {
    id: "6",
    image: "/images/product6.png",
    category: "Nature & Landscapes",
    location: "Africa",
    title: "Silueta al Atardecer",
  },
  {
    id: "7",
    image: "/images/product7.png",
    category: "Art & Creation",
    location: "Abstract & Textures",
    title: "Veins of Vitality",
  },
  {
    id: "8",
    image: "/images/product8.png",
    category: "Nature & Landscapes",
    location: "Africa",
    title: "Silueta al Atardecer",
  },
  {
    id: "9",
    image: "/images/product9.png",
    category: "Black & White",
    location: "Europe",
    title: "Triton’s Guardians",
  },
];

const PAGE_SIZE = 12;

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");

export default function Gallery() {
  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<string>("default");

  // Pagination
  const [page, setPage] = useState(1);

  // Search + Filter
  const filtered = useMemo(() => {
    const q = normalize(search.trim());
    let items = ALL_PRODUCTS.filter((p) => {
      const matchesQuery =
        !q ||
        normalize(p.title).includes(q) ||
        normalize(p.location).includes(q) ||
        normalize(p.category).includes(q);
      const matchesCategory = !category || p.category === category;
      return matchesQuery && matchesCategory;
    });

    // Sort
    if (sort === "az") {
      items = [...items].sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
      );
    } else if (sort === "za") {
      items = [...items].sort((a, b) =>
        b.title.localeCompare(a.title, undefined, { sensitivity: "base" })
      );
    }
    // "newest", "oldest" üçün tarix varsa buradan istifadə et:
    // else if (sort === "newest") { items.sort((a,b)=> +new Date(b.createdAt!) - +new Date(a.createdAt!)) }

    return items;
  }, [search, category, sort]);

  // Pagination calc
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = Math.min(startIdx + PAGE_SIZE, total);
  const pageItems = filtered.slice(startIdx, endIdx);

  // Handlers from filters
  const handleSearchChange = (v: string) => {
    setSearch(v);
    setPage(1);
  };
  const handleCategoryChange = (c: string | null) => {
    setCategory(c);
    setPage(1);
  };
  const handleSortChange = (s: string) => {
    setSort(s);
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-[#0d1117] text-white">
      <GalleryFilters
        // İstəsən categories prop verə bilərsən ki, düymələr siyahısı buradan gəlsin
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />

      <section className="max-w-[1268px] mx-auto px-5">
        {/* Results summary */}
        <div className="mb-4 text-[#9ca3af]">
          {total > 0 ? (
            <p>
              Showing {startIdx + 1} - {endIdx} of {total} results
              {category ? ` · ${category}` : ""}
              {search ? ` · “${search}”` : ""}
            </p>
          ) : (
            <p>No results found{search ? ` for “${search}”` : ""}.</p>
          )}
        </div>

        {/* Products Grid */}
        <Products
          products={pageItems}
          total={total}
          showingFrom={startIdx + 1 || 0}
          showingTo={endIdx}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 mb-16 flex items-center justify-center gap-2">
            <button
              className="px-3 py-2 rounded-md border border-[#2a3842] bg-[#1d2a35] disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="px-3 py-2 text-[#9ca3af]">
              Page {currentPage} / {totalPages}
            </span>
            <button
              className="px-3 py-2 rounded-md border border-[#2a3842] bg-[#1d2a35] disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
    