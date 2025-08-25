// src/data/heroSlides.ts
export type Slide = {
  id: string;
  title: string;
  description: string;
  image: string;
  date?: string;
  location?: string;
  tags?: string[];
  content?: string; // optional long text shown on detail
};

export const heroSlides: Slide[] = [
  {
    id: "1",
    title: "Final Amber",
    description:
      "‘Final Amber’ showcases a golden sunset over Montenegro’s Durmitor National Park",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    date: "Aug 25, 2025",
    location: "Durmitor, Montenegro",
    tags: ["Landscape", "Sunset"],
    content:
      "Shot on a crisp autumn evening as the last light poured across the ridges. Subtle haze adds depth to the layers of peaks.",
  },
  {
    id: "2",
    title: "Frozen Ridge",
    description: "Snow textures carving through a silent valley.",
    image:
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1600&auto=format&fit=crop",
    date: "Jan 14, 2025",
    location: "Unknown",
    tags: ["Winter", "Monochrome"],
    content:
      "A study of contrast and negative space. Wind-carved snow reveals delicate patterns along the slope.",
  },
  {
    id: "3",
    title: "Misty Path",
    description: "Morning haze rolling over ancient hills.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop",
    date: "May 9, 2025",
    location: "Highlands",
    tags: ["Fog", "Moody"],
    content:
      "First light meets low clouds. The path disappears into the valley as the sun begins to burn through.",
  },
];
    