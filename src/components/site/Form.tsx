import type { ReactNode } from "react";

export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive" role="alert">{error}</span>}
    </label>
  );
}

export function fieldErrors(issues: { path: (string | number)[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const i of issues) { const k = String(i.path[0]); if (!out[k]) out[k] = i.message; }
  return out;
}

export const phoneRegex = /^[+]?[0-9 ]{10,15}$/;
