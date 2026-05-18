import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist · VastraVibe" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-gold">Saved for later</span>
        <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">Your wishlist</h1>
        <p className="mt-2 text-muted-foreground">{items.length} saree{items.length === 1 ? "" : "s"} saved</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-16 text-center">
          <Heart className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">Your wishlist is empty. Tap the heart on any saree to save it here.</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Explore sarees
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
