import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingBag, Search, User, Heart, Sun, Moon, Sparkles } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useTheme } from "@/context/ThemeContext";

export function Navbar() {
  const { count } = useCart();
  const { items: wish } = useWishlist();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: query || undefined } as never });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="bg-gradient-royal text-primary-foreground">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-center gap-2 px-4 text-[11px] uppercase tracking-[0.2em]">
          <Sparkles className="h-3 w-3 text-gold" />
          <span>Free shipping over ₹1499 · Festive Sale up to 60% off</span>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-royal text-primary-foreground shadow-elegant">
            <span className="font-display text-lg font-semibold text-gold">V</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl font-semibold tracking-tight">VastraVibe</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Sarees of India</div>
          </div>
        </Link>

        <form onSubmit={onSearch} className="relative ml-4 hidden flex-1 max-w-xl md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Banarasi, Kanjivaram, Bridal sarees…"
            className="h-10 w-full rounded-full border border-input bg-secondary/60 pl-10 pr-4 text-sm outline-none transition focus:border-ring focus:bg-background"
          />
        </form>

        <nav className="ml-auto flex items-center gap-1">
          <Link to="/shop" className="hidden rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground sm:inline-flex">
            Shop
          </Link>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full p-2 text-foreground/80 transition hover:bg-secondary hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link to="/wishlist" aria-label="Wishlist" className="relative rounded-full p-2 text-foreground/80 transition hover:bg-secondary hover:text-foreground">
            <Heart className="h-5 w-5" />
            {wish.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                {wish.length}
              </span>
            )}
          </Link>
          <Link to="/login" aria-label="Account" className="rounded-full p-2 text-foreground/80 transition hover:bg-secondary hover:text-foreground">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative rounded-full p-2 text-foreground/80 transition hover:bg-secondary hover:text-foreground">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>

      <form onSubmit={onSearch} className="relative px-4 pb-3 md:hidden">
        <Search className="pointer-events-none absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search sarees…"
          className="h-10 w-full rounded-full border border-input bg-secondary/60 pl-10 pr-4 text-sm outline-none focus:border-ring focus:bg-background"
        />
      </form>
    </header>
  );
}
