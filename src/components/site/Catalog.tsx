import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductTile } from "./ProductTile";
import type { Product } from "@/lib/products";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

export function Catalog({ items, groups, groupKey, label }: { items: Product[]; groups: string[]; groupKey: "brand" | "category"; label: string }) {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("All");
  const [max, setMax] = useState(Math.max(...items.map((i) => i.price)));
  const [sort, setSort] = useState<Sort>("featured");
  const ceiling = Math.max(...items.map((i) => i.price));

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    let r = items.filter((p) =>
      (group === "All" || p[groupKey] === group) &&
      p.price <= max &&
      (!term || `${p.brand} ${p.name} ${p.specs.join(" ")}`.toLowerCase().includes(term)));
    if (sort === "price-asc") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [items, q, group, max, sort, groupKey]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="card-surface flex flex-col gap-4 p-4 md:flex-row md:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search</span>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${label.toLowerCase()}…`} className="field pl-9" maxLength={60} />
        </label>
        <label className="flex items-center gap-3 text-sm">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <span className="whitespace-nowrap">Up to ₹{max.toLocaleString("en-IN")}</span>
          <input type="range" min={0} max={ceiling} step={100} value={max} onChange={(e) => setMax(+e.target.value)} className="accent-primary" aria-label="Maximum price" />
        </label>
        <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="field md:w-48" aria-label="Sort">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Top rated</option>
        </select>
      </div>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label={`Filter by ${groupKey}`}>
        {["All", ...groups].map((g) => (
          <button key={g} onClick={() => setGroup(g)} aria-pressed={group === g}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${group === g ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`}>
            {g}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">{list.length} {list.length === 1 ? "product" : "products"}</p>
      {list.length ? (
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{list.map((p) => <ProductTile key={p.id} p={p} />)}</div>
      ) : (
        <div className="mt-6 rounded-2xl bg-secondary p-10 text-center">
          <p className="font-semibold">No products match your filters.</p>
          <button className="btn btn-outline mt-4" onClick={() => { setQ(""); setGroup("All"); setMax(ceiling); }}>Reset filters</button>
        </div>
      )}
    </div>
  );
}
