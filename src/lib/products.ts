export type Product = {
  id: string;
  kind: "phone" | "accessory";
  brand: string;
  name: string;
  price: number;
  mrp: number;
  category?: string;
  specs: string[];
  description: string;
  rating: number;
  hue: number; // tint for product tile
  imageUrl?: string;
  imagePath?: string;
};

export const phones: Product[] = [
  { id: "iphone-16-pro", kind: "phone", brand: "Apple", name: "iPhone 16 Pro", price: 119900, mrp: 129900, specs: ["6.3\" Super Retina XDR", "A18 Pro chip", "48MP triple camera", "256GB"], description: "Titanium design, Camera Control and all-day battery.", rating: 4.8, hue: 255 },
  { id: "iphone-15", kind: "phone", brand: "Apple", name: "iPhone 15", price: 64900, mrp: 69900, specs: ["6.1\" OLED", "A16 Bionic", "48MP dual camera", "128GB"], description: "Dynamic Island, USB-C and a brilliant 48MP camera.", rating: 4.7, hue: 220 },
  { id: "galaxy-s24-ultra", kind: "phone", brand: "Samsung", name: "Galaxy S24 Ultra", price: 109999, mrp: 129999, specs: ["6.8\" QHD+ AMOLED", "Snapdragon 8 Gen 3", "200MP quad camera", "256GB"], description: "Galaxy AI, built-in S Pen and titanium frame.", rating: 4.8, hue: 270 },
  { id: "galaxy-a55", kind: "phone", brand: "Samsung", name: "Galaxy A55 5G", price: 36999, mrp: 42999, specs: ["6.6\" Super AMOLED", "Exynos 1480", "50MP OIS camera", "128GB"], description: "Premium metal design with IP67 protection.", rating: 4.5, hue: 200 },
  { id: "pixel-9", kind: "phone", brand: "Google", name: "Pixel 9", price: 74999, mrp: 79999, specs: ["6.3\" Actua display", "Tensor G4", "50MP dual camera", "128GB"], description: "Google AI built in, with the best Pixel camera yet.", rating: 4.6, hue: 160 },
  { id: "oneplus-12r", kind: "phone", brand: "OnePlus", name: "OnePlus 12R", price: 39999, mrp: 42999, specs: ["6.78\" 120Hz AMOLED", "Snapdragon 8 Gen 2", "50MP camera", "256GB"], description: "Flagship speed with 100W SUPERVOOC charging.", rating: 4.5, hue: 190 },
  { id: "redmi-note-13-pro", kind: "phone", brand: "Xiaomi", name: "Redmi Note 13 Pro 5G", price: 23999, mrp: 28999, specs: ["6.67\" 1.5K AMOLED", "Snapdragon 7s Gen 2", "200MP camera", "128GB"], description: "200MP camera at an unbeatable price.", rating: 4.4, hue: 30 },
  { id: "vivo-v30", kind: "phone", brand: "Vivo", name: "Vivo V30 5G", price: 33999, mrp: 37999, specs: ["6.78\" AMOLED", "Snapdragon 7 Gen 3", "50MP Aura Light", "128GB"], description: "Slim design with studio-quality portraits.", rating: 4.4, hue: 330 },
  { id: "oppo-reno-12", kind: "phone", brand: "Oppo", name: "Oppo Reno 12 5G", price: 32999, mrp: 36999, specs: ["6.7\" 120Hz AMOLED", "Dimensity 7300", "50MP camera", "256GB"], description: "AI photo editing and 80W fast charge.", rating: 4.3, hue: 140 },
  { id: "realme-12-pro", kind: "phone", brand: "Realme", name: "Realme 12 Pro+ 5G", price: 29999, mrp: 33999, specs: ["6.7\" curved AMOLED", "Snapdragon 7s Gen 2", "64MP periscope", "256GB"], description: "Periscope zoom with a luxury watch-inspired look.", rating: 4.3, hue: 60 },
];

export const accessories: Product[] = [
  { id: "silicone-case", kind: "accessory", category: "Cases", brand: "Spigen", name: "Liquid Silicone Case", price: 799, mrp: 1299, specs: ["Soft-touch finish", "Raised camera lip"], description: "Slim, grippy protection for daily use.", rating: 4.5, hue: 255 },
  { id: "tempered-glass", kind: "accessory", category: "Tempered Glass", brand: "AM Pro", name: "9H Tempered Glass", price: 299, mrp: 599, specs: ["Edge-to-edge", "Free fitting in store"], description: "Bubble-free install done for you at the counter.", rating: 4.6, hue: 200 },
  { id: "charger-33w", kind: "accessory", category: "Chargers", brand: "Anker", name: "33W USB-C Fast Charger", price: 1499, mrp: 2199, specs: ["PD + QC 3.0", "Compact GaN"], description: "Fast-charge phones and earbuds safely.", rating: 4.7, hue: 220 },
  { id: "braided-cable", kind: "accessory", category: "Cables", brand: "Anker", name: "Braided USB-C Cable 1.5m", price: 599, mrp: 999, specs: ["60W", "10,000+ bend tested"], description: "Tough nylon braid that lasts.", rating: 4.5, hue: 180 },
  { id: "powerbank-20k", kind: "accessory", category: "Power Banks", brand: "Mi", name: "20000mAh Power Bank", price: 2199, mrp: 2999, specs: ["22.5W fast charge", "Dual output"], description: "Four full phone charges on the go.", rating: 4.6, hue: 270 },
  { id: "earbuds-pro", kind: "accessory", category: "Earbuds", brand: "boAt", name: "Airdopes Pro ANC", price: 1999, mrp: 4999, specs: ["ANC", "40h playback"], description: "Deep bass with active noise cancellation.", rating: 4.3, hue: 300 },
  { id: "bt-speaker", kind: "accessory", category: "Bluetooth Speakers", brand: "JBL", name: "JBL Go 4", price: 3499, mrp: 3999, specs: ["IP67", "7h playback"], description: "Big sound in a pocket-sized speaker.", rating: 4.7, hue: 20 },
  { id: "smartwatch", kind: "accessory", category: "Smartwatches", brand: "Noise", name: "ColorFit Pro 5", price: 3999, mrp: 6999, specs: ["1.85\" AMOLED", "Bluetooth calling"], description: "Health tracking with a bright AMOLED screen.", rating: 4.2, hue: 160 },
  { id: "car-mount", kind: "accessory", category: "Others", brand: "Portronics", name: "Magnetic Car Mount", price: 699, mrp: 1199, specs: ["360° rotation", "Strong N52 magnets"], description: "Safe one-hand navigation while driving.", rating: 4.4, hue: 90 },
];

export const allProducts = [...phones, ...accessories];
export const findProduct = (id: string) => allProducts.find((p) => p.id === id);
export const phoneBrands = Array.from(new Set(phones.map((p) => p.brand)));
export const accessoryCategories = Array.from(new Set(accessories.flatMap((p) => p.category ? [p.category] : [])));
