import { Link } from "@tanstack/react-router";
import { Star, Plus } from "lucide-react";
import { toast } from "sonner";
import { formatINR, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    add(product);
    toast.success("Added to cart", { description: product.name });
  };

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant"
    >
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          {product.category}
        </span>
        <h3 className="line-clamp-1 font-medium text-foreground">{product.name}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="text-foreground">{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-lg font-semibold">{formatINR(product.price)}</span>
          <button
            onClick={onAdd}
            aria-label="Add to cart"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90 active:scale-95"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
