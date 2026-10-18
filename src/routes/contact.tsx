import { createFileRoute } from "@tanstack/react-router";
import { Clock, Loader2, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { PageHeader } from "@/components/site/Layout";
import { Field, fieldErrors, phoneRegex } from "@/components/site/Form";
import { supabase } from "@/integrations/supabase/client";
import { STORE } from "@/lib/store-info";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AM Mobiles Valangaiman" },
      { name: "description", content: `Visit AM Mobiles, ${STORE.address}. Call ${STORE.phoneDisplay}. Open daily till 9 pm.` },
      { property: "og:title", content: "Contact AM Mobiles" },
      { property: "og:description", content: "Address, phone, WhatsApp and opening hours." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
  message: z.string().trim().min(5, "Message is too short").max(1000),
});

function Contact() {
  const empty = { name: "", phone: "", message: "" };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<"customer_name" | "phone" | "device_model" | "issue" | "preferred_date" | "address" | "payment_method" | "name" | "message", string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) return setErrors(fieldErrors(r.error.issues));
    setErrors({}); setStatus("loading");
    const { error } = await supabase.from("contact_messages").insert(r.data);
    if (error) return setStatus("error");
    setStatus("done"); setForm(empty);
  }

  const info = [
    { icon: MapPin, label: "Address", value: STORE.address, href: STORE.mapLink },
    { icon: Phone, label: "Phone", value: STORE.phoneDisplay, href: `tel:${STORE.phoneTel}` },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${STORE.whatsapp}` },
    { icon: Clock, label: "Hours", value: STORE.hours },
  ];

  return (
    <>
      <PageHeader eyebrow="Contact" title="Visit or reach us" sub="Drop by the store, call, or send us a message." />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {info.map((i) => {
              const inner = (<><i.icon className="h-5 w-5 text-primary" /><p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{i.label}</p><p className="mt-1 font-semibold">{i.value}</p></>);
              return i.href
                ? <a key={i.label} href={i.href} target={i.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="card-surface lift block p-5">{inner}</a>
                : <div key={i.label} className="card-surface p-5">{inner}</div>;
            })}
          </div>
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe title="AM Mobiles location map" src={STORE.mapEmbed} className="h-72 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={STORE.mapLink} target="_blank" rel="noreferrer" className="btn btn-outline"><Navigation className="h-4 w-4" /> Directions</a>
            <a href={`https://wa.me/${STORE.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-primary"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
          </div>
        </div>
        <div className="card-surface p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Send a message</h2>
          {status === "done" ? (
            <div className="mt-6 rounded-2xl bg-accent p-6 text-center">
              <p className="font-semibold">Thanks! We'll get back to you soon.</p>
              <button className="btn btn-outline mt-4" onClick={() => setStatus("idle")}>Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-6 space-y-4">
              <Field label="Name" error={errors.name}><input className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} autoComplete="name" /></Field>
              <Field label="Phone" error={errors.phone}><input className="field" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={15} autoComplete="tel" /></Field>
              <Field label="Message" error={errors.message}><textarea className="field min-h-32" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} /></Field>
              {status === "error" && <p className="text-sm text-destructive" role="alert">Couldn't send. Please try again or call us.</p>}
              <button className="btn btn-primary w-full" disabled={status === "loading"}>{status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : "Send message"}</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
