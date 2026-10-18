import { Link } from "@tanstack/react-router";
import { ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import phoneImg from "@/assets/phone.jpg";
import accImg from "@/assets/accessories.jpg";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/store-info";
import type { Product } from "@/lib/products";

export function ProductImage({ p, className = "" }: { p: Product; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-secondary ${className}`}>
      <img
        src={p.kind === "phone" ? phoneImg : accImg}
        alt={`${p.brand} ${p.name}`}
        loading="lazy"
        width={816}
        height={816}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ filter: `hue-rotate(${p.hue - 230}deg)` }}
      />
    </div>
  );
}

export function ProductTile({ p }: { p: Product }) {
  const { add } = useCart();
  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);
  return (
    <article className="group card-surface lift flex flex-col p-3">
      <Link to="/product/$id" params={{ id: p.id }} className="block">
        <div className="relative">
          <ProductImage p={p} className="aspect-square" />
          {off > 0 && (
            <span className="absolute left-2 top-2 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
              {off}% OFF
            </span>
          )}
        </div>
        <div className="px-1 pt-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">{p.category ?? p.brand}</p>
          <h3 className="mt-1 font-semibold leading-snug">{p.kind === "phone" ? p.name : `${p.brand} ${p.name}`}</h3>
          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{p.specs.join(" · ")}</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {p.rating}
          </div>
        </div>
      </Link>
      <div className="mt-auto flex items-end justify-between gap-2 px-1 pt-3">
        <div>
          <p className="text-lg font-bold">{formatINR(p.price)}</p>
          <p className="text-xs text-muted-foreground line-through">{formatINR(p.mrp)}</p>
        </div>
        <button
          onClick={() => { add(p.id); toast.success(`${p.name} added to cart`); }}
          className="btn btn-primary px-3 py-2.5"
          aria-label={`Add ${p.name} to cart`}
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
