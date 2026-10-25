import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BatteryCharging, Camera, Cpu, ShieldCheck, Smartphone, Star, Truck, Wrench } from "lucide-react";
import hero from "@/assets/hero.jpg";
import accImg from "@/assets/accessories.jpg";
import repairImg from "@/assets/repair.jpg";
import { ProductTile } from "@/components/site/ProductTile";
import { useProducts } from '@/lib/catalog';
import { STORE } from "@/lib/store-info";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AM Mobiles Valangaiman — Your One-Stop Mobile Destination" },
      { name: "description", content: "Latest smartphones, genuine accessories and fast repairs in Valangaiman. Rated 4.7★ by 59 customers." },
      { property: "og:title", content: "AM Mobiles Valangaiman" },
      { property: "og:description", content: "Smartphones, accessories and expert repairs in Valangaiman, Tamil Nadu." },
    ],
  }),
  component: Index,
});

const reviews = [
  { name: "Karthik R.", text: "Screen replaced in under an hour, looks brand new. Honest pricing!" },
  { name: "Priya S.", text: "Got my Galaxy at a better price than online. Very friendly staff." },
  { name: "Mohammed A.", text: "Best accessories collection in Valangaiman. Tempered glass fitted free." },
];

function Index() {
  const products = useProducts();
  const phones = products.filter(p => p.kind === 'phone');
  const accessories = products.filter(p => p.kind === 'accessory');
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <img src={hero} alt="Latest flagship smartphones" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover opacity-70 md:object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-36">
          <div className="max-w-xl fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-ink-muted/30 px-3 py-1 text-xs font-semibold">
              <Star className="h-3.5 w-3.5 fill-primary-glow text-primary-glow" /> {STORE.rating} rated · {STORE.reviews} reviews · Valangaiman
            </p>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] sm:text-6xl">
              Your One-Stop <span className="text-gradient">Mobile</span> Destination
            </h1>
            <p className="mt-5 text-lg text-ink-muted">Latest smartphones, genuine accessories and expert repairs — all under one roof.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/smartphones" className="btn btn-primary">Shop Now <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/repairs" hash="book" className="btn btn-ghost-ink"><Wrench className="h-4 w-4" /> Book a Repair</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 sm:px-6 md:grid-cols-4">
        {[[ShieldCheck, "Genuine products"], [Wrench, "Same-day repairs"], [Truck, "Local delivery"], [BatteryCharging, "Warranty support"]].map(([I, t]) => {
          const Icon = I as typeof ShieldCheck;
          return (
            <div key={t as string} className="flex items-center gap-3 rounded-2xl bg-secondary p-4">
              <Icon className="h-5 w-5 text-primary" /><span className="text-sm font-semibold">{t as string}</span>
            </div>
          );
        })}
      </section>

      <Section title="Featured smartphones" link="/smartphones">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{phones.slice(0, 4).map((p) => <ProductTile key={p.id} p={p} />)}</div>
      </Section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-ink p-8 text-ink-foreground sm:p-12">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-glow">Special offer</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Free tempered glass + case with every smartphone</h2>
              <p className="mt-3 text-ink-muted">Plus easy exchange on your old phone. Visit the store for the best deal.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/smartphones" className="btn btn-primary">Browse phones</Link>
              <Link to="/contact" className="btn btn-ghost-ink">Ask about exchange</Link>
            </div>
          </div>
        </div>
      </section>

      <Section title="Popular accessories" link="/accessories">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl md:row-span-2">
            <img src={accImg} alt="Mobile accessories" loading="lazy" width={1200} height={800} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-6 text-ink-foreground">
              <p className="text-2xl font-bold">Gear up</p>
              <Link to="/accessories" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary-glow">Shop accessories <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-2">{accessories.slice(0, 4).map((p) => <ProductTile key={p.id} p={p} />)}</div>
        </div>
      </Section>

      <Section title="Repair services" link="/repairs">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <img src={repairImg} alt="Technician repairing a phone" loading="lazy" width={1200} height={800} className="rounded-3xl" />
          <div className="grid grid-cols-2 gap-3">
            {[[Smartphone, "Screen replacement"], [BatteryCharging, "Battery replacement"], [Camera, "Camera repair"], [Cpu, "Software issues"]].map(([I, t]) => {
              const Icon = I as typeof Smartphone;
              return (
                <div key={t as string} className="card-surface lift p-5">
                  <Icon className="h-6 w-6 text-primary" /><p className="mt-3 font-semibold">{t as string}</p>
                </div>
              );
            })}
            <Link to="/repairs" hash="book" className="btn btn-primary col-span-2 mt-2">Book a repair</Link>
          </div>
        </div>
      </Section>

      <Section title="What customers say">
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="card-surface p-6">
              <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}</div>
              <blockquote className="mt-3 text-sm">“{r.text}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold">{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </>
  );
}

function Section({ title, link, children }: { title: string; link?: "/smartphones" | "/accessories" | "/repairs"; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-3xl font-bold">{title}</h2>
        {link && <Link to={link} className="inline-flex items-center gap-1 text-sm font-semibold text-primary">View all <ArrowRight className="h-4 w-4" /></Link>}
      </div>
      {children}
    </section>
  );
}
