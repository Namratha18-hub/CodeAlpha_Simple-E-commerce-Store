import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { Link, useNavigate } from "@tanstack/react-router";

type Search = { q?: string; category?: string; sort?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
    sort: typeof s.sort === "string" ? s.sort : undefined,
  }),
  head: () => ({ meta: [{ title: "Shop · Lumen" }, { name: "description", content: "Browse all products." }] }),
  component: Shop,
});

function Shop() {
  const { q, category, sort } = Route.useSearch();
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let list = products;
    if (category && category !== "All") list = list.filter((p) => p.category === category);
    if (q) {
      const t = q.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(t) || p.description.toLowerCase().includes(t));
    }
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, category, sort]);

  const setSearch = (next: Partial<Search>) =>
    navigate({ to: "/shop", search: ({ q, category, sort, ...next } as never) });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-semibold md:text-5xl">Shop</h1>
        <p className="mt-2 text-muted-foreground">{filtered.length} products{q ? ` matching "${q}"` : ""}</p>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = (category ?? "All") === c;
            return (
              <Link
                key={c}
                to="/shop"
                search={({ q, sort, category: c === "All" ? undefined : c } as never)}
                className={`rounded-full border px-4 py-1.5 text-sm transition ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:bg-secondary"
                }`}
              >
                {c}
              </Link>
            );
          })}
        </div>

        <select
          value={sort ?? ""}
          onChange={(e) => setSearch({ sort: e.target.value || undefined })}
          className="h-9 rounded-full border border-border bg-background px-4 text-sm"
        >
          <option value="">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-16 text-center">
          <p className="text-muted-foreground">No products found. Try a different search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
