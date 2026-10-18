import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Menu, MessageCircle, Phone, ShoppingBag, X, Youtube } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { STORE } from "@/lib/store-info";

const nav = [
  { to: "/", label: "Home" },
  { to: "/smartphones", label: "Smartphones" },
  { to: "/accessories", label: "Accessories" },
  { to: "/repairs", label: "Repairs" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-sm text-ink-foreground">AM</span>
          <span>AM <span className="text-gradient">Mobiles</span></span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:${STORE.phoneTel}`} className="hidden items-center gap-2 text-sm font-semibold md:flex">
            <Phone className="h-4 w-4 text-primary" /> {STORE.phoneDisplay}
          </a>
          <Link to="/cart" className="relative grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary" aria-label={`Cart, ${count} items`}>
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">{count}</span>}
          </Link>
          <button className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 lg:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: n.to === "/" }}
              className="block rounded-xl px-3 py-3 font-medium" activeProps={{ className: "bg-secondary text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl font-bold">AM <span className="text-gradient">Mobiles</span></p>
          <p className="mt-3 max-w-sm text-sm text-ink-muted">Smartphones, accessories and expert repairs in Valangaiman. Rated {STORE.rating}★ by {STORE.reviews} customers.</p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Facebook, Youtube].map((I, i) => (
              <a key={i} href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Social link" className="grid h-10 w-10 place-items-center rounded-full border border-ink-muted/30 hover:border-primary hover:text-primary"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold">Shop</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            {nav.slice(1).map((n) => <li key={n.to}><Link to={n.to} className="hover:text-ink-foreground">{n.label}</Link></li>)}
          </ul>
        </div>
        <div className="space-y-3 text-sm text-ink-muted">
          <p className="font-semibold text-ink-foreground">Visit us</p>
          <p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-primary" />{STORE.address}</p>
          <a href={`tel:${STORE.phoneTel}`} className="flex gap-2 hover:text-ink-foreground"><Phone className="h-4 w-4 text-primary" />{STORE.phoneDisplay}</a>
          <a href={`https://wa.me/${STORE.whatsapp}`} target="_blank" rel="noreferrer" className="flex gap-2 hover:text-ink-foreground"><MessageCircle className="h-4 w-4 text-primary" />WhatsApp us</a>
          <p>{STORE.hours}</p>
        </div>
      </div>
      <p className="border-t border-ink-muted/20 py-5 text-center text-xs text-ink-muted">© {new Date().getFullYear()} AM Mobiles Valangaiman</p>
    </footer>
  );
}

export function PageHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 fade-up">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary-glow">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{title}</h1>
        {sub && <p className="mt-4 max-w-2xl text-ink-muted">{sub}</p>}
      </div>
    </section>
  );
}

export function WhatsAppFab() {
  return (
    <a href={`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent("Hi AM Mobiles, I have a query.")}`} target="_blank" rel="noreferrer"
      aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-success text-primary-foreground shadow-lg transition-transform hover:scale-110">
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
