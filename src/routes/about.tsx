import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, HeartHandshake, ShieldCheck, Wrench } from "lucide-react";
import repairImg from "@/assets/repair.jpg";
import { PageHeader } from "@/components/site/Layout";
import { STORE } from "@/lib/store-info";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — AM Mobiles Valangaiman" },
      { name: "description", content: "Valangaiman's trusted electronics store for smartphones, accessories and repairs." },
      { property: "og:title", content: "About AM Mobiles" },
      { property: "og:description", content: "Trusted mobile store in Valangaiman, rated 4.7★." },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="About us" title="Valangaiman's trusted mobile store" sub={`Rated ${STORE.rating}★ by ${STORE.reviews} customers on Google.`} />
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
        <div className="space-y-4 text-muted-foreground">
          <h2 className="text-3xl font-bold text-foreground">Phones, accessories & repairs — under one roof</h2>
          <p>AM Mobiles on Kumbakonam Main Road brings the latest smartphones and genuine accessories to Valangaiman at fair prices.</p>
          <p>Our technicians handle everything from cracked screens to software issues, with clear quotes before any work begins.</p>
          <Link to="/contact" className="btn btn-primary mt-2">Visit the store</Link>
        </div>
        <img src={repairImg} alt="AM Mobiles repair bench" loading="lazy" width={1200} height={800} className="rounded-3xl" />
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
        {[[Award, "Expertise", "Skilled technicians for all major brands."], [ShieldCheck, "Product quality", "Only genuine, warranty-backed products."], [Wrench, "Fast service", "Most repairs done the same day."], [HeartHandshake, "Customer care", "Friendly advice, before and after you buy."]].map(([I, t, d]) => {
          const Icon = I as typeof Award;
          return (
            <div key={t as string} className="card-surface p-6">
              <Icon className="h-7 w-7 text-primary" />
              <h3 className="mt-4 font-semibold">{t as string}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d as string}</p>
            </div>
          );
        })}
      </section>
    </>
  ),
});
