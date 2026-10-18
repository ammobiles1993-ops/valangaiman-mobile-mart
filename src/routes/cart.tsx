import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/site/Layout";
import { ProductImage } from "@/components/site/ProductTile";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/store-info";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — AM Mobiles" },
      { name: "description", content: "Review the items in your AM Mobiles cart." },
      { property: "og:title", content: "Cart — AM Mobiles" },
      { property: "og:description", content: "Your shopping cart." },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { lines, subtotal, setQty, remove } = useCart();
  return (
    <>
      <PageHeader eyebrow="Cart" title="Your cart" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {lines.length === 0 ? (
          <div className="rounded-3xl bg-secondary p-14 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-primary" />
            <p className="mt-4 text-lg font-semibold">Your cart is empty</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link to="/smartphones" className="btn btn-primary">Shop phones</Link>
              <Link to="/accessories" className="btn btn-outline">Accessories</Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="space-y-3">
              {lines.map(({ id, qty, product: p }) => (
                <li key={id} className="card-surface flex items-center gap-4 p-3">
                  <Link to="/product/$id" params={{ id }} className="w-20 shrink-0 sm:w-24"><ProductImage p={p} className="aspect-square" /></Link>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{p.brand} {p.name}</p>
                    <p className="text-sm text-muted-foreground">{formatINR(p.price)}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-border">
                        <button className="grid h-8 w-8 place-items-center" onClick={() => setQty(id, qty - 1)} aria-label="Decrease"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                        <button className="grid h-8 w-8 place-items-center" onClick={() => setQty(id, qty + 1)} aria-label="Increase"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <button onClick={() => remove(id)} className="text-muted-foreground hover:text-destructive" aria-label={`Remove ${p.name}`}><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <p className="font-bold">{formatINR(p.price * qty)}</p>
                </li>
              ))}
            </ul>
            <aside className="card-surface h-fit p-6">
              <h2 className="text-lg font-bold">Order summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
                <div className="flex justify-between"><span>Delivery / pickup</span><span className="text-success">Free</span></div>
              </div>
              <div className="mt-4 flex justify-between border-t border-border pt-4 text-lg font-bold"><span>Total</span><span>{formatINR(subtotal)}</span></div>
              <Link to="/checkout" className="btn btn-primary mt-6 w-full">Checkout</Link>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
