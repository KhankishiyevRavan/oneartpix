// src/hooks/useSearchIndex.ts
import { useEffect, useState } from "react";
import productsClient from "../service/productService";
import {
  MENU,
  GALLERY_FALLBACK,
  type GalleryItem,
  type MenuItem,
} from "../data/searchIndex";

type ProductDTO = {
  id: string;
  title: string;
  tags?: string[];
  mainImage?: string;
  images?: string[];
  image?: string;
  // ...səndə nə varsa
};

export function useSearchIndex() {
  const [pages] = useState<MenuItem[]>(MENU);
  const [gallery, setGallery] = useState<GalleryItem[]>(GALLERY_FALLBACK);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const resp = await productsClient.listUI({ page: 1, pageSize: 50 });
        // resp strukturu { items } kimidirsə:
        const items: ProductDTO[] = Array.isArray((resp as any)?.items)
          ? (resp as any).items
          : Array.isArray(resp)
          ? (resp as any)
          : [];

        const mapped: GalleryItem[] = items.map((p) => ({
          id: p.id,
          title: p.title,
          tags: p.tags ?? [],
          thumb: p.image ?? "",
        }));

        if (!cancelled && mapped.length) setGallery(mapped);
      } catch (e) {
        console.error("[useSearchIndex] load error:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { pages, gallery, loading };
}
