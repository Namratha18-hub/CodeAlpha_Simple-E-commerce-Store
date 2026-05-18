import { Link } from "@tanstack/react-router";
import { Star, ShoppingBag, Heart } from "lucide-react";
import { toast } from "sonner";
import { discountPct, formatINR, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const wished = has(product.id);
  const off = discountPct(product);

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    add(product);
    toast.success("Added to cart", { description: product.name });
  };

  const onWish = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle(product);
    toast(wished ? "Removed from wishlist" : "Saved to wishlist", { description: product.name });
  };

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover-lift hover:shadow-elegant"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={1000}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        {off > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
            {off}% off
          </span>
        )}
        {product.isNew && (
          <span className="absolute right-3 top-3 rounded-full bg-gradient-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
            New
          </span>
        )}
        <button
          onClick={onWish}
          aria-label="Wishlist"
          className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground/80 backdrop-blur transition hover:scale-110 hover:text-primary"
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-primary text-primary" : ""}`} />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{product.category}</span>
        <h3 className="line-clamp-1 font-medium text-foreground">{product.name}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span className="text-foreground">{product.rating}</span>
          <span>({product.reviews})</span>
          <span className="ml-auto text-[10px] uppercase tracking-wider">{product.fabric}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-semibold">{formatINR(product.price)}</span>
            {off > 0 && <span className="text-xs text-muted-foreground line-through">{formatINR(product.mrp)}</span>}
          </div>
          <button
            onClick={onAdd}
            aria-label="Add to cart"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90 active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
