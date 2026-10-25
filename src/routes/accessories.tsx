import { createFileRoute } from "@tanstack/react-router";
import { Catalog } from "@/components/site/Catalog";
import { PageHeader } from "@/components/site/Layout";
import { useProducts } from '@/lib/catalog';

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Mobile Accessories — AM Mobiles Valangaiman" },
      { name: "description", content: "Cases, tempered glass, chargers, cables, power banks, earbuds, speakers and smartwatches." },
      { property: "og:title", content: "Mobile Accessories at AM Mobiles" },
      { property: "og:description", content: "Genuine accessories for every phone." },
    ],
  }),
  component: Accessories,
});
function Accessories() {
  const accessories = useProducts().filter(p => p.kind === 'accessory');
  const accessoryCategories = [...new Set(accessories.flatMap(p => p.category ? [p.category] : []))];
  return (
    <>
      <PageHeader eyebrow="Accessories" title="Gear for every phone" sub="Cases, glass, chargers, audio and wearables — genuine and affordable." />
      <Catalog items={accessories} groups={accessoryCategories} groupKey="category" label="Accessories" />
    </>
  );
}
