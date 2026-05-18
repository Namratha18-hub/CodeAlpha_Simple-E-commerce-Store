import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products, categories, fabrics, occasions } from "@/data/products";

type Search = { q?: string; category?: string; fabric?: string; occasion?: string; sort?: string; max?: number };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
    fabric: typeof s.fabric === "string" ? s.fabric : undefined,
    occasion: typeof s.occasion === "string" ? s.occasion : undefined,
    sort: typeof s.sort === "string" ? s.sort : undefined,
    max: typeof s.max === "number" ? s.max : undefined,
  }),
  head: () => ({ meta: [{ title: "Saree Collection · VastraVibe" }, { name: "description", content: "Browse 120+ Banarasi, Kanjivaram, Bridal, Designer and handloom sarees." }] }),
  component: Shop,
});

function Shop() {
  const { q, category, fabric, occasion, sort, max } = Route.useSearch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products;
    if (category && category !== "All") list = list.filter((p) => p.category === category);
    if (fabric) list = list.filter((p) => p.fabric === fabric);
    if (occasion) list = list.filter((p) => p.occasion === occasion);
    if (max) list = list.filter((p) => p.price <= max);
    if (q) {
      const t = q.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(t) || p.description.toLowerCase().includes(t) || p.category.toLowerCase().includes(t));
    }
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "newest") list = [...list].sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
    return list;
  }, [q, category, fabric, occasion, sort, max]);

  const setSearch = (next: Partial<Search>) =>
    navigate({ to: "/shop", search: ({ q, category, fabric, occasion, sort, max, ...next } as never) });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 animate-fade-up">
        <span className="text-xs uppercase tracking-[0.2em] text-gold">All Sarees</span>
        <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">The Collection</h1>
        <p className="mt-2 text-muted-foreground">{filtered.length} sarees{q ? ` for "${q}"` : ""}</p>
      </div>

      {/* Category pills */}
      <div className="mb-6 -mx-6 overflow-x-auto px-6">
        <div className="flex w-max gap-2">
          {categories.map((c) => {
            const active = (category ?? "All") === c;
            return (
              <Link
                key={c}
                to="/shop"
                search={({ q, sort, fabric, occasion, max, category: c === "All" ? undefined : c } as never)}
                className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition ${
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-elegant"
                    : "border-border bg-background hover:border-gold hover:bg-secondary"
                }`}
              >
                {c}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button onClick={() => setOpen((v) => !v)} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-secondary">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
        <select
          value={sort ?? ""}
          onChange={(e) => setSearch({ sort: e.target.value || undefined })}
          className="h-10 rounded-full border border-border bg-background px-4 text-sm"
        >
          <option value="">Sort: Featured</option>
          <option value="newest">Newest first</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
        {(fabric || occasion || max) && (
          <button onClick={() => setSearch({ fabric: undefined, occasion: undefined, max: undefined })} className="text-sm text-primary hover:underline">
            Clear filters
          </button>
        )}
      </div>

      {open && (
        <div className="mb-8 grid gap-6 rounded-2xl border border-border bg-card p-6 md:grid-cols-3 animate-fade-in">
          <div>
            <h4 className="mb-3 font-medium">Fabric</h4>
            <div className="flex flex-wrap gap-2">
              {fabrics.map((f) => (
                <button
                  key={f}
                  onClick={() => setSearch({ fabric: fabric === f ? undefined : f })}
                  className={`rounded-full border px-3 py-1 text-xs ${fabric === f ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-medium">Occasion</h4>
            <div className="flex flex-wrap gap-2">
              {occasions.map((o) => (
                <button
                  key={o}
                  onClick={() => setSearch({ occasion: occasion === o ? undefined : o })}
                  className={`rounded-full border px-3 py-1 text-xs ${occasion === o ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-medium">Max Price: ₹{max ?? 30000}</h4>
            <input
              type="range"
              min={1000}
              max={30000}
              step={500}
              value={max ?? 30000}
              onChange={(e) => setSearch({ max: Number(e.target.value) })}
              className="w-full accent-[var(--primary)]"
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>₹1,000</span><span>₹30,000</span>
            </div>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-16 text-center">
          <p className="text-muted-foreground">No sarees match these filters. Try clearing them.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
