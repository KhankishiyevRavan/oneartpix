// src/data/searchIndex.ts
export type MenuItem = { label: string; href: string; id: string };

export const MENU: MenuItem[] = [
  { label: "COLLECTIONS & THEMES", href: "/gallery", id: "1" },
  { label: "NEWS", href: "/news", id: "2" },
  { label: "CONTACT ME", href: "/contact", id: "3" },
  { label: "MUST HAVE", href: "/must-have", id: "4" },
  { label: "DIGITAL & WEB SERVICES", href: "/services", id: "5" },
];

export type GalleryItem = {
  id: string;
  title: string;
  tags?: string[];
  thumb?: string;
};

// fallback (ilk renderdə göstərmək üçün)
export const GALLERY_FALLBACK: GalleryItem[] = [
  {
    id: "1",
    title: "Final Amber",
    tags: ["montenegro", "sunset", "durmitor", "landscape"],
    thumb:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Frozen Ridge",
    tags: ["snow", "valley", "winter"],
    thumb:
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Misty Path",
    tags: ["morning", "haze", "hills"],
    thumb:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=400&auto=format&fit=crop",
  },
];
