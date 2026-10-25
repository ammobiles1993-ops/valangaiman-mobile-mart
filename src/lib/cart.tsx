import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { type Product } from "./products";
import { useProducts } from './catalog';

type Line = { id: string; qty: number };
type CartCtx = {
  lines: (Line & { product: Product })[];
  count: number;
  subtotal: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "am-cart";

export function cartSubtotal(lines: { price: number; qty: number }[]) {
  return lines.reduce((s, l) => s + l.price * l.qty, 0);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const products = useProducts();
  const [raw, setRaw] = useState<Line[]>([]);
  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(v)) setRaw(v);
    } catch { /* ignore */ }
  }, []);
  const save = (next: Line[]) => {
    setRaw(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };
  const value = useMemo<CartCtx>(() => {
    const lines = raw
      .flatMap((l) => { const product = products.find(p => p.id === l.id); return product ? [{ ...l, product }] : []; });
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: cartSubtotal(lines.map((l) => ({ price: l.product.price, qty: l.qty }))),
      add: (id, qty = 1) => {
        const ex = raw.find((l) => l.id === id);
        save(ex ? raw.map((l) => (l.id === id ? { ...l, qty: Math.min(10, l.qty + qty) } : l)) : [...raw, { id, qty }]);
      },
      setQty: (id, qty) => save(qty <= 0 ? raw.filter((l) => l.id !== id) : raw.map((l) => (l.id === id ? { ...l, qty: Math.min(10, qty) } : l))),
      remove: (id) => save(raw.filter((l) => l.id !== id)),
      clear: () => save([]),
    };
  }, [raw, products]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
