import { createFileRoute } from "@tanstack/react-router";
import { Catalog } from "@/components/site/Catalog";
import { PageHeader } from "@/components/site/Layout";
import { useProducts } from '@/lib/catalog';

export const Route = createFileRoute("/smartphones")({
  head: () => ({
    meta: [
      { title: "Smartphones — AM Mobiles Valangaiman" },
      { name: "description", content: "Shop iPhone, Samsung, Pixel, OnePlus, Xiaomi, Vivo, Oppo and Realme phones at the best prices in Valangaiman." },
      { property: "og:title", content: "Smartphones at AM Mobiles" },
      { property: "og:description", content: "Latest smartphones from top brands at great prices." },
    ],
  }),
  component: Smartphones,
});

function Smartphones() {
  const phones = useProducts().filter(p => p.kind === 'phone');
  const phoneBrands = [...new Set(phones.map(p => p.brand))];
  return (
    <>
      <PageHeader eyebrow="Smartphones" title="Find your next phone" sub="Top brands, honest prices and free tempered glass with every purchase." />
      <Catalog items={phones} groups={phoneBrands} groupKey="brand" label="Smartphones" />
    </>
  );
}
