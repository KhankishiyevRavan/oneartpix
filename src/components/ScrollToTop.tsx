// src/components/ScrollToTop.tsx
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

type Props = { behavior?: ScrollBehavior }; // "auto" | "smooth"

export default function ScrollToTop({ behavior = "auto" }: Props) {
  const { pathname, hash, key } = useLocation();

  useLayoutEffect(() => {
    // Anchor (#section) varsa, default davranışı saxla
    if (hash) return;
    // Hər naviqasiyada ən üstdən başla
    window.scrollTo({ top: 0, left: 0, behavior });
  }, [pathname, key, hash, behavior]);

  return null;
}
