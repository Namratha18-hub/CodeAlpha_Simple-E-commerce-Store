import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/data/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout · Lumen" }] }),
  component: Checkout,
});

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [placed, setPlaced] = useState<string | null>(null);

  const shipping = subtotal > 0 && subtotal < 999 ? 99 : 0;
  const total = subtotal + shipping;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    setTimeout(() => {
      const orderId = "LMN" + Math.floor(100000 + Math.random() * 900000);
      setPlaced(orderId);
      clear();
      toast.success("Order placed!", { description: `Order ${orderId} confirmed.` });
      setLoading(false);
    }, 1200);
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-6 font-display text-4xl font-semibold">Thank you!</h1>
        <p className="mt-3 text-muted-foreground">Your order <span className="font-mono font-medium text-foreground">{placed}</span> is on its way.</p>
        <button onClick={() => navigate({ to: "/shop" })} className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Continue shopping
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl">Nothing to checkout</h1>
        <Link to="/shop" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold md:text-5xl">Checkout</h1>

      <form onSubmit={onSubmit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <Section title="Contact">
            <Field label="Email" type="email" name="email" required />
            <Field label="Phone" name="phone" required />
          </Section>
          <Section title="Shipping address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" required />
              <Field label="Last name" required />
            </div>
            <Field label="Address" required />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="City" required />
              <Field label="State" required />
              <Field label="PIN code" required />
            </div>
          </Section>
          <Section title="Payment">
            <div className="grid gap-3 sm:grid-cols-3">
              {["UPI", "Card", "Cash on Delivery"].map((m, i) => (
                <label key={m} className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <input type="radio" name="payment" defaultChecked={i === 0} className="accent-primary" />
                  <span className="text-sm font-medium">{m}</span>
                </label>
              ))}
            </div>
          </Section>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-xl font-semibold">Your order</h2>
          <ul className="mt-4 space-y-3">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex items-center gap-3 text-sm">
                <img src={product.image} alt="" width={48} height={48} className="h-12 w-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="line-clamp-1 font-medium">{product.name}</p>
                  <p className="text-muted-foreground">Qty {quantity}</p>
                </div>
                <p>{formatINR(product.price * quantity)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Free" : formatINR(shipping)}</dd></div>
            <div className="flex justify-between border-t border-border pt-3 font-display text-lg font-semibold"><dt>Total</dt><dd>{formatINR(total)}</dd></div>
          </dl>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
          >
            {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />}
            {loading ? "Placing order…" : `Pay ${formatINR(total)}`}
          </button>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        {...props}
        className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring"
      />
    </label>
  );
}
