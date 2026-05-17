import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingBag, Search, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: query || undefined } as never });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
          <span className="font-display text-xl font-semibold tracking-tight">Lumen</span>
        </Link>

        <form onSubmit={onSearch} className="relative ml-2 hidden flex-1 max-w-xl md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for headphones, sneakers, candles…"
            className="h-10 w-full rounded-full border border-input bg-secondary/60 pl-10 pr-4 text-sm outline-none transition focus:border-ring focus:bg-background"
          />
        </form>

        <nav className="ml-auto flex items-center gap-1">
          <Link
            to="/shop"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground sm:inline-flex"
            activeProps={{ className: "text-foreground" }}
          >
            Shop
          </Link>
          <Link
            to="/login"
            className="rounded-full p-2 text-foreground/80 transition hover:bg-secondary hover:text-foreground"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            to="/cart"
            className="relative rounded-full p-2 text-foreground/80 transition hover:bg-secondary hover:text-foreground"
            aria-label="Cart"
          >
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
          placeholder="Search products…"
          className="h-10 w-full rounded-full border border-input bg-secondary/60 pl-10 pr-4 text-sm outline-none focus:border-ring focus:bg-background"
        />
      </form>
    </header>
  );
}
