import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-royal text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 bg-background/10 text-gold">
              <span className="font-display text-lg font-semibold">V</span>
            </div>
            <div className="font-display text-2xl">VastraVibe</div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/80">
            India's curated saree atelier — weaving heritage, hand-loom and haute couture across every region.
          </p>
          <div className="mt-5 flex gap-3 text-gold">
            <a href="#" aria-label="Instagram" className="rounded-full border border-gold/30 p-2 hover:bg-gold/10"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="rounded-full border border-gold/30 p-2 hover:bg-gold/10"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="YouTube" className="rounded-full border border-gold/30 p-2 hover:bg-gold/10"><Youtube className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="rounded-full border border-gold/30 p-2 hover:bg-gold/10"><Twitter className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/shop" search={{ category: "Banarasi" } as never} className="hover:text-gold">Banarasi</Link></li>
            <li><Link to="/shop" search={{ category: "Kanjivaram" } as never} className="hover:text-gold">Kanjivaram</Link></li>
            <li><Link to="/shop" search={{ category: "Bridal" } as never} className="hover:text-gold">Bridal</Link></li>
            <li><Link to="/shop" search={{ category: "Designer" } as never} className="hover:text-gold">Designer</Link></li>
            <li><Link to="/shop" search={{ category: "Handloom" } as never} className="hover:text-gold">Handloom</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold">Help</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>Shipping & Delivery</li>
            <li>7-Day Easy Returns</li>
            <li>Size & Drape Guide</li>
            <li>Track your order</li>
            <li>Contact us</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold">Newsletter</h4>
          <p className="mt-4 text-sm text-primary-foreground/80">
            Receive new arrivals, festive collections and styling notes.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-4 flex items-center overflow-hidden rounded-full border border-gold/40 bg-background/10"
          >
            <Mail className="ml-3 h-4 w-4 text-gold" />
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 bg-transparent px-3 py-2 text-sm placeholder:text-primary-foreground/50 outline-none"
            />
            <button className="bg-gradient-gold px-4 py-2 text-sm font-medium text-primary">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="border-t border-gold/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-primary-foreground/70 sm:flex-row">
          <p>© {new Date().getFullYear()} VastraVibe. Hand-stitched in India.</p>
          <p>Secure payments · UPI · Cards · Razorpay (demo)</p>
        </div>
      </div>
    </footer>
  );
}
