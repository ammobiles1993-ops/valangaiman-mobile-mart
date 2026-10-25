import { z } from 'zod';
export const productSchema = z.object({
  id: z.string().min(1), kind: z.enum(['phone', 'accessory']),
  brand: z.string().trim().min(1).max(100), name: z.string().trim().min(1).max(150),
  price: z.number().int().nonnegative(), mrp: z.number().int().nonnegative(),
  category: z.string().max(100).nullable(), specs: z.array(z.string().max(200)).max(20),
  description: z.string().max(2000), rating: z.number().min(0).max(5),
  hue: z.number().int(), image_url: z.string().nullable(),
}).refine(p => p.mrp >= p.price, { message: 'MRP must be at least the selling price', path: ['mrp'] });