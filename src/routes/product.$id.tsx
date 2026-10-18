import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductImage, ProductTile } from "@/components/site/ProductTile";
import { useCart } from "@/lib/cart";
import { allProducts, findProduct } from "@/lib/products";
import { formatINR } from "@/lib/store-info";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = findProduct(params.id);
    if (!p) throw notFound();
    return { p };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.p;
    const title = p ? `${p.brand} ${p.name} — AM Mobiles` : "Product unavailable — AM Mobiles";
    const desc = p ? `${p.description} ${formatINR(p.price)} at AM Mobiles Valangaiman.` : "This product is unavailable.";
    return { meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }] };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Product not found</h1>
      <Link to="/smartphones" className="btn btn-primary mt-6">Browse smartphones</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { p } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const related = allProducts.filter((x) => x.kind === p.kind && x.id !== p.id).slice(0, 4);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link to={p.kind === "phone" ? "/smartphones" : "/accessories"} className="text-sm text-muted-foreground hover:text-primary">← Back to {p.kind === "phone" ? "smartphones" : "accessories"}</Link>
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <ProductImage p={p} className="aspect-square" />
        <div className="fade-up">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">{p.brand}{p.category ? ` · ${p.category}` : ""}</p>
          <h1 className="mt-2 text-4xl font-bold">{p.name}</h1>
          <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground"><Star className="h-4 w-4 fill-primary text-primary" /> {p.rating} rating</p>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold">{formatINR(p.price)}</span>
            <span className="text-muted-foreground line-through">{formatINR(p.mrp)}</span>
            <span className="text-sm font-semibold text-success">Save {formatINR(p.mrp - p.price)}</span>
          </div>
          <p className="mt-5 text-muted-foreground">{p.description}</p>
          <ul className="mt-6 space-y-2">
            {p.specs.map((s) => <li key={s} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" />{s}</li>)}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-border">
              <button className="grid h-11 w-11 place-items-center" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease"><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center font-semibold" aria-live="polite">{qty}</span>
              <button className="grid h-11 w-11 place-items-center" onClick={() => setQty(Math.min(10, qty + 1))} aria-label="Increase"><Plus className="h-4 w-4" /></button>
            </div>
            <button className="btn btn-primary" onClick={() => { add(p.id, qty); toast.success(`${qty} × ${p.name} added to cart`); }}><ShoppingBag className="h-4 w-4" /> Add to cart</button>
            <Link to="/cart" className="btn btn-outline">View cart</Link>
          </div>
        </div>
      </div>
      <h2 className="mt-20 text-2xl font-bold">You may also like</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">{related.map((r) => <ProductTile key={r.id} p={r} />)}</div>
    </div>
  );
}
