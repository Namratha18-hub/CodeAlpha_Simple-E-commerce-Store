import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — Modern Essentials Store" },
      { name: "description", content: "Curated electronics, fashion and home essentials. Indian pricing, free shipping over ₹999." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = products.slice(0, 4);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-warm opacity-60" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
              New Season · 2026
            </span>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              Everyday objects, <em className="font-display italic text-primary">extraordinarily</em> chosen.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              A small catalog of beautifully built things — sourced in India, priced honestly, shipped fast.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 hover:shadow-elegant"
              >
                Shop the collection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/shop"
                search={{ category: "Electronics" } as never}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3 text-sm font-medium backdrop-blur hover:bg-background"
              >
                Browse Electronics
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              {products.slice(0, 4).map((p, i) => (
                <div
                  key={p.id}
                  className={`overflow-hidden rounded-2xl border border-border bg-card shadow-elegant ${
                    i % 2 === 0 ? "translate-y-4" : "-translate-y-2"
                  }`}
                >
                  <img src={p.image} alt={p.name} width={400} height={400} className="aspect-square h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 sm:grid-cols-3">
          {[
            { icon: Truck, title: "Free shipping", desc: "On orders over ₹999" },
            { icon: ShieldCheck, title: "Secure checkout", desc: "UPI, cards & netbanking" },
            { icon: RefreshCw, title: "7-day returns", desc: "No questions asked" },
          ].map((v) => (
            <div key={v.title} className="flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-background">
                <v.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{v.title}</p>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured grid */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">Featured this week</h2>
            <p className="mt-2 text-muted-foreground">Handpicked pieces our customers keep coming back for.</p>
          </div>
          <Link to="/shop" className="hidden text-sm font-medium text-primary hover:underline sm:inline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}
