import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Sparkles, Star, Quote } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import heroImg from "@/assets/saree-hero.jpg";
import banarasi from "@/assets/saree-banarasi.jpg";
import kanjivaram from "@/assets/saree-kanjivaram.jpg";
import bridal from "@/assets/saree-bridal.jpg";
import organza from "@/assets/saree-organza.jpg";
import chiffon from "@/assets/saree-chiffon.jpg";
import cotton from "@/assets/saree-cotton.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VastraVibe — Premium Indian Sarees Online" },
      { name: "description", content: "India's curated saree atelier. Banarasi, Kanjivaram, Bridal, Designer & Handloom sarees with free shipping over ₹1499." },
    ],
  }),
  component: Index,
});

const collectionStrip = [
  { label: "Banarasi", img: banarasi },
  { label: "Kanjivaram", img: kanjivaram },
  { label: "Bridal", img: bridal },
  { label: "Organza", img: organza },
  { label: "Chiffon", img: chiffon },
  { label: "Handloom", img: cotton },
];

function Index() {
  const trending = products.filter((p) => p.isBestseller).slice(0, 8);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const festive = products.filter((p) => p.occasion === "Festive").slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary backdrop-blur">
              <Sparkles className="h-3 w-3 text-gold" /> Festive Edit · 2026
            </span>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              The thread of <em className="italic text-primary">India</em>, woven for you.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              From Varanasi looms to Kanchipuram temples — discover heirloom sarees handpicked across every region, fabric and occasion.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 hover:shadow-elegant"
              >
                Explore the collection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/shop"
                search={{ category: "Bridal" } as never}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3 text-sm font-medium backdrop-blur hover:bg-background"
              >
                Bridal Drapes
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div><span className="font-display text-2xl font-semibold text-foreground">120+</span><br/>Saree styles</div>
              <div className="h-8 w-px bg-border" />
              <div><span className="font-display text-2xl font-semibold text-foreground">20+</span><br/>Regional weaves</div>
              <div className="h-8 w-px bg-border" />
              <div><span className="font-display text-2xl font-semibold text-foreground">4.9★</span><br/>Customer rating</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-gold opacity-25 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] border border-gold/30 shadow-elegant">
              <img src={heroImg} alt="Model in pink georgette saree" width={1536} height={1152} className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-gold/30 bg-background/95 p-4 shadow-elegant backdrop-blur md:block">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[banarasi, kanjivaram, bridal].map((src) => (
                    <img key={src} src={src} alt="" className="h-10 w-10 rounded-full border-2 border-background object-cover" />
                  ))}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Loved by</p>
                  <p className="font-display text-lg font-semibold">12,400+ women</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-border bg-primary py-3 text-primary-foreground">
        <div className="marquee gap-12 px-6 text-sm uppercase tracking-[0.3em]">
          {Array.from({ length: 2 }).flatMap((_, i) =>
            ["Festive Sale · up to 60% off", "Free shipping over ₹1499", "Handloom certified", "7-day easy returns", "COD available", "Razorpay secure checkout"].map((t, k) => (
              <span key={`${i}-${k}`} className="flex shrink-0 items-center gap-12">
                <span>{t}</span>
                <Sparkles className="h-3 w-3 text-gold" />
              </span>
            ))
          )}
        </div>
      </div>

      {/* Category strip */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">Shop by collection</h2>
            <p className="mt-2 text-muted-foreground">A region. A loom. A story.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
          {collectionStrip.map((c) => (
            <Link
              key={c.label}
              to="/shop"
              search={{ category: c.label } as never}
              className="group relative overflow-hidden rounded-2xl border border-border hover-lift"
            >
              <img src={c.img} alt={c.label} loading="lazy" width={400} height={500} className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-3 text-center font-display text-lg font-semibold text-primary-foreground">
                {c.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Value props */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 sm:grid-cols-3">
          {[
            { icon: Truck, title: "Free shipping", desc: "On orders over ₹1499" },
            { icon: ShieldCheck, title: "Secure checkout", desc: "UPI, cards & Razorpay" },
            { icon: RefreshCw, title: "7-day returns", desc: "No questions asked" },
          ].map((v) => (
            <div key={v.title} className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-gold text-primary">
                <v.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{v.title}</p>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-gold">Bestsellers</span>
            <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Trending this week</h2>
          </div>
          <Link to="/shop" className="hidden text-sm font-medium text-primary hover:underline sm:inline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Bridal banner */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-royal text-primary-foreground">
          <div className="grid items-center gap-8 p-10 md:grid-cols-2 md:p-16">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-gold">The Bridal Edit</span>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
                Saat phere, one saree to remember.
              </h2>
              <p className="mt-4 max-w-md text-primary-foreground/80">
                Hand-embroidered zardozi, kundan and pearl detailing — designed for the most cherished moment of your life.
              </p>
              <Link
                to="/shop"
                search={{ category: "Bridal" } as never}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3 text-sm font-semibold text-primary hover:shadow-gold"
              >
                Discover Bridal <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              <img src={bridal} alt="Bridal saree" width={896} height={1152} className="aspect-[4/5] w-full rounded-2xl border border-gold/30 object-cover shadow-elegant" />
            </div>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-gold">Just Dropped</span>
            <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">New arrivals</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Festive */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-gold">Festive Specials</span>
            <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Diwali · Karwa Chauth · Pongal</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {festive.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-10 text-center font-display text-3xl font-semibold md:text-4xl">Words from our patrons</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: "Ananya Iyer", city: "Chennai", text: "My Kanjivaram arrived wrapped like a gift from my grandmother. The zari is exquisite." },
            { name: "Meera Banerjee", city: "Kolkata", text: "VastraVibe's tant collection feels like home. Every drape has a story." },
            { name: "Priyanka Sharma", city: "Mumbai", text: "Wore the bridal red on my wedding day. Compliments haven't stopped since." },
          ].map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-card p-6 hover-lift">
              <Quote className="h-5 w-5 text-gold" />
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">{t.text}</p>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="font-display text-base font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.city}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
