import { createFileRoute } from "@tanstack/react-router";
import { BatteryCharging, Camera, CheckCircle2, Cpu, Loader2, Plug, Smartphone, Volume2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import repairImg from "@/assets/repair.jpg";
import { PageHeader } from "@/components/site/Layout";
import { Field, fieldErrors, phoneRegex } from "@/components/site/Form";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/repairs")({
  head: () => ({
    meta: [
      { title: "Mobile Repair Services — AM Mobiles Valangaiman" },
      { name: "description", content: "Screen, battery, charging port, camera, speaker and software repairs. Book online." },
      { property: "og:title", content: "Mobile Repairs at AM Mobiles" },
      { property: "og:description", content: "Fast, reliable phone repairs in Valangaiman. Book a slot online." },
    ],
  }),
  component: Repairs,
});

const services = [
  { icon: Smartphone, name: "Screen replacement", desc: "Cracked or unresponsive display replaced with quality panels.", from: 1499 },
  { icon: BatteryCharging, name: "Battery replacement", desc: "Restore all-day battery life on draining phones.", from: 999 },
  { icon: Plug, name: "Charging port repair", desc: "Fix loose, slow or non-charging ports.", from: 499 },
  { icon: Camera, name: "Camera repair", desc: "Blurry, cracked or dead camera modules repaired.", from: 899 },
  { icon: Volume2, name: "Speaker repair", desc: "Low or crackling sound, mic and earpiece fixes.", from: 499 },
  { icon: Cpu, name: "Software troubleshooting", desc: "Hang, boot loop, updates, data backup and more.", from: 299 },
];

const schema = z.object({
  customer_name: z.string().trim().min(2, "Enter your name").max(100),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
  device_model: z.string().trim().min(2, "Enter your device model").max(100),
  issue: z.string().trim().min(5, "Describe the issue (at least 5 characters)").max(1000),
  preferred_date: z.string().refine((d) => !!d && d >= new Date().toISOString().slice(0, 10), "Choose today or a future date"),
});

function Repairs() {
  const empty = { customer_name: "", phone: "", device_model: "", issue: "", preferred_date: "" };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) return setErrors(fieldErrors(r.error.issues));
    setErrors({}); setStatus("loading");
    const { error } = await supabase.from("repair_bookings").insert(r.data);
    if (error) return setStatus("error");
    setStatus("done"); setForm(empty);
  }

  return (
    <>
      <PageHeader eyebrow="Repair services" title="Expert repairs, done right" sub="Most repairs completed the same day by experienced technicians." />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.name} className="card-surface lift p-6">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent"><s.icon className="h-6 w-6 text-primary" /></span>
              <h2 className="mt-4 text-lg font-semibold">{s.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              <p className="mt-4 text-sm">From <span className="font-bold text-primary">₹{s.from.toLocaleString("en-IN")}</span></p>
            </article>
          ))}
        </div>
      </section>
      <section id="book" className="mx-auto grid max-w-7xl scroll-mt-24 gap-10 px-4 sm:px-6 md:grid-cols-2">
        <img src={repairImg} alt="Phone repair in progress" loading="lazy" width={1200} height={800} className="h-full rounded-3xl object-cover" />
        <div className="card-surface p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Book a repair</h2>
          <p className="mt-1 text-sm text-muted-foreground">We'll call you to confirm your slot.</p>
          {status === "done" ? (
            <div className="mt-8 rounded-2xl bg-accent p-6 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
              <p className="mt-3 font-semibold">Booking received!</p>
              <p className="mt-1 text-sm text-muted-foreground">Our team will contact you shortly.</p>
              <button className="btn btn-outline mt-5" onClick={() => setStatus("idle")}>Book another</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your name" error={errors.customer_name}><input className="field" value={form.customer_name} onChange={set("customer_name")} maxLength={100} autoComplete="name" /></Field>
                <Field label="Phone number" error={errors.phone}><input className="field" type="tel" value={form.phone} onChange={set("phone")} maxLength={15} autoComplete="tel" /></Field>
                <Field label="Device model" error={errors.device_model}><input className="field" value={form.device_model} onChange={set("device_model")} placeholder="e.g. iPhone 13" maxLength={100} /></Field>
                <Field label="Preferred date" error={errors.preferred_date}><input className="field" type="date" value={form.preferred_date} onChange={set("preferred_date")} min={new Date().toISOString().slice(0, 10)} /></Field>
              </div>
              <Field label="Describe the issue" error={errors.issue}><textarea className="field min-h-28" value={form.issue} onChange={set("issue")} maxLength={1000} /></Field>
              {status === "error" && <p className="text-sm text-destructive" role="alert">Couldn't send your booking. Please try again or call us.</p>}
              <button className="btn btn-primary w-full" disabled={status === "loading"}>
                {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Booking…</> : "Confirm booking"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
