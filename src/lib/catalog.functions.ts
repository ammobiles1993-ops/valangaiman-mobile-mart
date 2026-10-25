import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import type { Product } from './products';

export const getCatalog = createServerFn({ method: 'GET' }).handler(async (): Promise<Product[]> => {
  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) throw new Error('Shop connection unavailable');
  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (headers.get('Authorization') === `Bearer ${key}` && key.startsWith('sb_')) headers.delete('Authorization');
      headers.set('apikey', key);
      return fetch(input, { ...init, headers });
    } },
  });
  const { data, error } = await client.from('products').select('*').order('position').order('created_at');
  if (error) throw new Error(error.message);
  const paths = (data ?? []).flatMap(p => p.image_url ? [p.image_url] : []);
  const signed = paths.length ? await client.storage.from('product-photos').createSignedUrls(paths, 3600) : null;
  if (signed?.error) throw new Error(signed.error.message);
  const images = new Map(signed?.data?.map(i => [i.path, i.signedUrl]) ?? []);
  return (data ?? []).map(p => ({ ...p, kind: p.kind === 'phone' ? 'phone' : 'accessory', category: p.category ?? undefined, imagePath: p.image_url ?? undefined, imageUrl: p.image_url ? images.get(p.image_url)?.replace(url, import.meta.env.VITE_SUPABASE_URL) : undefined }));
});