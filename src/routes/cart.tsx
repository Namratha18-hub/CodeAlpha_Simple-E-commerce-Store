import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/data/products";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart · Lumen" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  const shipping = subtotal > 0 && subtotal < 999 ? 99 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl font-semibold">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Discover something you'll love.</p>
        <Link to="/shop" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold md:text-5xl">Cart</h1>
      <p className="mt-2 text-muted-foreground">{items.length} item{items.length > 1 ? "s" : ""}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="space-y-4">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
              <Link to="/product/$id" params={{ id: product.id }} className="shrink-0">
                <img src={product.image} alt={product.name} width={120} height={120} className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link to="/product/$id" params={{ id: product.id }} className="font-medium hover:underline">
                      {product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <p className="font-display font-semibold">{formatINR(product.price * quantity)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button onClick={() => setQty(product.id, quantity - 1)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="w-7 text-center text-sm">{quantity}</span>
                    <button onClick={() => setQty(product.id, quantity + 1)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <button onClick={() => remove(product.id)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-xl font-semibold">Order summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Free" : formatINR(shipping)}</dd></div>
            <div className="mt-4 flex justify-between border-t border-border pt-4 font-display text-lg font-semibold"><dt>Total</dt><dd>{formatINR(total)}</dd></div>
          </dl>
          <Link to="/checkout" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 hover:shadow-elegant">
            Proceed to checkout
          </Link>
          <Link to="/shop" className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground">Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}
