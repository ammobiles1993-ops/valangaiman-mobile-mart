export const STORE = {
  name: "AM Mobiles",
  town: "Valangaiman",
  address: "Thanjavur SH-66, Kumbakonam Main Road, Valangaiman, Tamil Nadu 612804",
  phoneDisplay: "097905 46677",
  phoneTel: "+919790546677",
  whatsapp: "919790546677",
  rating: 4.7,
  reviews: 59,
  hours: "Open daily · Closes 9 pm",
  mapEmbed:
    "https://www.google.com/maps?q=V9VW%2B6M+Valangaiman,+Tamil+Nadu&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=V9VW%2B6M+Valangaiman+Tamil+Nadu",
};

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
