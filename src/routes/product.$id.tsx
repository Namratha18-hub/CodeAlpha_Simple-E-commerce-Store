import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { formatINR, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} · Lumen` },
          { name: "description", content: loaderData.product.description },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl">Product not found</h1>
      <Link to="/shop" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">Back to shop</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="p-12 text-center text-destructive">{error.message}</div>,
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const onAdd = () => {
    add(product, qty);
    toast.success("Added to cart", { description: `${qty} × ${product.name}` });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> ·{" "}
        <Link to="/shop" className="hover:text-foreground">Shop</Link> ·{" "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-border bg-secondary">
          <img src={product.image} alt={product.name} width={800} height={800} className="aspect-square w-full object-cover" />
        </div>

        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</span>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight md:text-5xl">{product.name}</h1>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          <p className="mt-6 text-muted-foreground">{product.description}</p>

          <p className="mt-8 font-display text-3xl font-semibold">{formatINR(product.price)}</p>
          <p className="text-sm text-muted-foreground">Inclusive of all taxes</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-11 w-11 place-items-center rounded-full hover:bg-secondary">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-secondary">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={onAdd}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 hover:shadow-elegant active:scale-[0.98]"
            >
              <ShoppingBag className="h-4 w-4" /> Add to cart
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6 text-sm">
            <div><p className="text-muted-foreground">Shipping</p><p className="font-medium">2–4 days</p></div>
            <div><p className="text-muted-foreground">Returns</p><p className="font-medium">7 days</p></div>
            <div><p className="text-muted-foreground">Warranty</p><p className="font-medium">1 year</p></div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-6 font-display text-2xl font-semibold">You may also like</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
