import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Minus, Plus, ShoppingBag, Heart, Truck, RefreshCw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { discountPct, formatINR, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
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
          { title: `${loaderData.product.name} · VastraVibe` },
          { name: "description", content: loaderData.product.description },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl">Saree not found</h1>
      <Link to="/shop" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">Back to collection</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="p-12 text-center text-destructive">{error.message}</div>,
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState<string>(product.image);
  const [color, setColor] = useState<string>(product.colors[0]);
  const off = discountPct(product);

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const onAdd = () => {
    add(product, qty);
    toast.success("Added to cart", { description: `${qty} × ${product.name}` });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 animate-fade-in">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> ·{" "}
        <Link to="/shop" className="hover:text-foreground">Shop</Link> ·{" "}
        <Link to="/shop" search={{ category: product.category } as never} className="hover:text-foreground">{product.category}</Link> ·{" "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-3xl border border-gold/30 bg-secondary shadow-elegant">
            <img src={activeImg} alt={product.name} width={800} height={1000} className="aspect-[4/5] w-full object-cover transition" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.gallery.map((g) => (
              <button
                key={g}
                onClick={() => setActiveImg(g)}
                className={`overflow-hidden rounded-xl border-2 ${activeImg === g ? "border-primary" : "border-transparent"}`}
              >
                <img src={g} alt="" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.2em] text-gold">{product.category} · {product.fabric}</span>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight md:text-5xl">{product.name}</h1>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              <span className="font-medium">{product.rating}</span>
            </span>
            <span className="text-muted-foreground">({product.reviews} reviews)</span>
            <span className="ml-2 rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">{product.occasion}</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <p className="font-display text-4xl font-semibold text-primary">{formatINR(product.price)}</p>
            {off > 0 && (
              <>
                <p className="text-lg text-muted-foreground line-through">{formatINR(product.mrp)}</p>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{off}% off</span>
              </>
            )}
          </div>
          <p className="text-sm text-muted-foreground">Inclusive of all taxes · Blouse piece included</p>

          <p className="mt-6 leading-relaxed text-foreground/90">{product.description}</p>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Colour: <span className="text-foreground">{color}</span></p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`rounded-full border px-3 py-1.5 text-xs ${color === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-xs text-muted-foreground">
            {product.stock > 5 ? (
              <span className="text-emerald-600 dark:text-emerald-400">● In stock · {product.stock} available</span>
            ) : (
              <span className="text-destructive">● Only {product.stock} left — order soon!</span>
            )}
          </div>

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
            <button
              onClick={() => { toggle(product); toast(has(product.id) ? "Removed from wishlist" : "Saved to wishlist"); }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium hover:bg-secondary"
            >
              <Heart className={`h-4 w-4 ${has(product.id) ? "fill-primary text-primary" : ""}`} /> Wishlist
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6 text-sm">
            <div className="flex items-start gap-2"><Truck className="h-4 w-4 text-gold" /><div><p className="font-medium">Shipping</p><p className="text-xs text-muted-foreground">3–5 days</p></div></div>
            <div className="flex items-start gap-2"><RefreshCw className="h-4 w-4 text-gold" /><div><p className="font-medium">Returns</p><p className="text-xs text-muted-foreground">7 days</p></div></div>
            <div className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 text-gold" /><div><p className="font-medium">Authentic</p><p className="text-xs text-muted-foreground">Hand-picked</p></div></div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-6 font-display text-2xl font-semibold">You may also love</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
