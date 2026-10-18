import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { PageHeader } from "@/components/site/Layout";
import { Field, fieldErrors, phoneRegex } from "@/components/site/Form";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/store-info";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — AM Mobiles" },
      { name: "description", content: "Place your order with AM Mobiles Valangaiman." },
      { property: "og:title", content: "Checkout — AM Mobiles" },
      { property: "og:description", content: "Complete your order." },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  customer_name: z.string().trim().min(2, "Enter your name").max(100),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
  address: z.string().trim().min(5, "Enter your address").max(500),
  payment_method: z.enum(["cod", "store_pickup"]),
});

function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const [form, setForm] = useState({ customer_name: "", phone: "", address: "", payment_method: "cod" as "cod" | "store_pickup" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) return setErrors(fieldErrors(r.error.issues));
    setErrors({}); setStatus("loading");
    const items = lines.map((l) => ({ id: l.id, name: `${l.product.brand} ${l.product.name}`, price: l.product.price, qty: l.qty }));
    const { error } = await supabase.from("orders").insert({ ...r.data, items, total: subtotal });
    if (error) return setStatus("error");
    clear(); setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center fade-up">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
        <h1 className="mt-4 text-3xl font-bold">Order placed!</h1>
        <p className="mt-2 text-muted-foreground">We'll call you shortly to confirm your order.</p>
        <Link to="/" className="btn btn-primary mt-6">Back to home</Link>
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link to="/smartphones" className="btn btn-primary mt-6">Start shopping</Link>
      </div>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Checkout" title="Almost there" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_380px]">
        <form onSubmit={submit} noValidate className="card-surface space-y-4 p-6 sm:p-8">
          <h2 className="text-xl font-bold">Your details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" error={errors.customer_name}><input className="field" value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} maxLength={100} autoComplete="name" /></Field>
            <Field label="Phone" error={errors.phone}><input className="field" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={15} autoComplete="tel" /></Field>
          </div>
          <Field label="Address" error={errors.address}><textarea className="field min-h-24" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} maxLength={500} autoComplete="street-address" /></Field>
          <fieldset>
            <legend className="mb-2 text-sm font-medium">Payment</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {([["cod", "Cash on delivery"], ["store_pickup", "Pay at store pickup"]] as const).map(([v, l]) => (
                <label key={v} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${form.payment_method === v ? "border-primary bg-accent" : "border-border"}`}>
                  <input type="radio" name="pay" className="accent-primary" checked={form.payment_method === v} onChange={() => setForm({ ...form, payment_method: v })} />
                  <span className="text-sm font-medium">{l}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {status === "error" && <p className="text-sm text-destructive" role="alert">Couldn't place your order. Please try again.</p>}
          <button className="btn btn-primary w-full" disabled={status === "loading"}>{status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Placing order…</> : `Place order · ${formatINR(subtotal)}`}</button>
        </form>
        <aside className="card-surface h-fit p-6">
          <h2 className="font-bold">Summary</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {lines.map((l) => <li key={l.id} className="flex justify-between gap-3"><span>{l.qty} × {l.product.name}</span><span className="font-medium">{formatINR(l.product.price * l.qty)}</span></li>)}
          </ul>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-lg font-bold"><span>Total</span><span>{formatINR(subtotal)}</span></div>
        </aside>
      </div>
    </>
  );
}
