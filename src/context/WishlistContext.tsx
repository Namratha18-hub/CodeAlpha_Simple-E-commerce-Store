import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";

type WishlistContextValue = {
  items: Product[];
  ids: Set<string>;
  toggle: (p: Product) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
};

const Ctx = createContext<WishlistContextValue | null>(null);
const KEY = "vastravibe-wishlist-v1";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<WishlistContextValue>(() => {
    const ids = new Set(items.map((i) => i.id));
    return {
      items,
      ids,
      has: (id) => ids.has(id),
      toggle: (p) =>
        setItems((prev) => (prev.find((i) => i.id === p.id) ? prev.filter((i) => i.id !== p.id) : [...prev, p])),
      remove: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
    };
  }, [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWishlist() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useWishlist must be used within WishlistProvider");
  return v;
}
