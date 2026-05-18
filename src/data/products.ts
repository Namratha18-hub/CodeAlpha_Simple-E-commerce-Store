import banarasi from "@/assets/saree-banarasi.jpg";
import kanjivaram from "@/assets/saree-kanjivaram.jpg";
import chiffon from "@/assets/saree-chiffon.jpg";
import cotton from "@/assets/saree-cotton.jpg";
import bridal from "@/assets/saree-bridal.jpg";
import organza from "@/assets/saree-organza.jpg";
import georgette from "@/assets/saree-georgette.jpg";

export type Product = {
  id: string;
  name: string;
  price: number; // INR (current)
  mrp: number; // INR (original)
  image: string;
  gallery: string[];
  category: string;
  fabric: string;
  occasion: string;
  colors: string[];
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  isNew?: boolean;
  isBestseller?: boolean;
};

export const categories = [
  "All",
  "Banarasi",
  "Kanjivaram",
  "Silk",
  "Cotton",
  "Chiffon",
  "Georgette",
  "Organza",
  "Bridal",
  "Party Wear",
  "Designer",
  "Handloom",
  "Linen",
  "Floral Print",
  "Embroidery",
  "Festive",
  "South Indian",
  "Bengali",
  "Gujarati",
  "Bollywood",
  "Traditional",
];

export const fabrics = ["Silk", "Cotton", "Chiffon", "Georgette", "Organza", "Linen", "Net", "Crepe"];
export const occasions = ["Wedding", "Party", "Festive", "Casual", "Office", "Bridal"];

const palette = ["Maroon", "Gold", "Royal Blue", "Emerald", "Magenta", "Cream", "Black", "Mustard", "Peach", "Teal", "Ivory", "Rust"];

const seedNames: Record<string, string[]> = {
  Banarasi: ["Kashi Heirloom", "Varanasi Royale", "Brocade Bliss", "Zari Glow", "Mughal Muse"],
  Kanjivaram: ["Temple Pride", "Kanchi Grandeur", "Mayil Motif", "Royal Pallu", "Devi Drape"],
  Silk: ["Mulberry Whisper", "Tussar Luxe", "Patola Reverie", "Mysore Sheen", "Paithani Dream"],
  Cotton: ["Khadi Breeze", "Jamdani Story", "Chanderi Daylight", "Tant Sunrise", "Handspun Calm"],
  Chiffon: ["Floral Mist", "Sheer Romance", "Pastel Petal", "Cloud Drape", "Soft Whisper"],
  Georgette: ["Midnight Sequin", "Starlit Soiree", "Crystal Cascade", "Velvet Hour", "Onyx Allure"],
  Organza: ["Glass Garden", "Iridescent Bloom", "Crystal Vine", "Tulle Whisper", "Lustre Petal"],
  Bridal: ["Sindoor Saga", "Lal Joda Legacy", "Phoolon Ki Doli", "Raat Ki Rani", "Saat Phere"],
  "Party Wear": ["Disco Drape", "Cocktail Hour", "Glam Glitter", "Champagne Night", "Neon Nawab"],
  Designer: ["Sabya Tribute", "Manish Muse", "Couture Cascade", "Studio Signature", "Avant Pallu"],
  Handloom: ["Weaver's Pride", "Loom & Land", "Karigari Touch", "Threads of Time", "Village Vine"],
  Linen: ["Breeze Linen", "Sunlit Weave", "Coastal Linen", "Daylight Drape", "Linen Lullaby"],
  "Floral Print": ["Gulmohar Bloom", "Genda Phool", "Marigold Dance", "Lily Pond", "Rose Garden"],
  Embroidery: ["Aari Atelier", "Zardozi Charm", "Resham Rhapsody", "Mirror & Thread", "Chikankari Cloud"],
  Festive: ["Diwali Diya", "Holi Hues", "Onam Onset", "Pongal Pride", "Eid Elegance"],
  "South Indian": ["Madurai Memory", "Coimbatore Classic", "Chettinad Charm", "Tirupati Tale", "Mysuru Mantle"],
  Bengali: ["Tagore's Tant", "Durga Drape", "Shantiniketan Sun", "Kolkata Kantha", "Hooghly Hue"],
  Gujarati: ["Bandhani Burst", "Patola Pride", "Garba Glow", "Kutch Kaleidoscope", "Rann Radiance"],
  Bollywood: ["Filmi Flair", "Item Number", "Silver Screen", "Diva Drape", "Cine Couture"],
  Traditional: ["Heritage Heirloom", "Vintage Vrindavan", "Classic Crown", "Timeless Tale", "Old World Opulence"],
};

const imageByCategory = (cat: string): { primary: string; gallery: string[] } => {
  const map: Record<string, string> = {
    Banarasi: banarasi,
    Kanjivaram: kanjivaram,
    Silk: kanjivaram,
    Cotton: cotton,
    Chiffon: chiffon,
    Georgette: georgette,
    Organza: organza,
    Bridal: bridal,
    "Party Wear": georgette,
    Designer: organza,
    Handloom: cotton,
    Linen: cotton,
    "Floral Print": organza,
    Embroidery: bridal,
    Festive: banarasi,
    "South Indian": kanjivaram,
    Bengali: cotton,
    Gujarati: chiffon,
    Bollywood: georgette,
    Traditional: banarasi,
  };
  const primary = map[cat] ?? banarasi;
  const all = [banarasi, kanjivaram, chiffon, cotton, bridal, organza, georgette];
  const gallery = [primary, ...all.filter((g) => g !== primary).slice(0, 3)];
  return { primary, gallery };
};

const fabricByCategory: Record<string, string> = {
  Banarasi: "Silk",
  Kanjivaram: "Silk",
  Silk: "Silk",
  Cotton: "Cotton",
  Chiffon: "Chiffon",
  Georgette: "Georgette",
  Organza: "Organza",
  Bridal: "Silk",
  "Party Wear": "Georgette",
  Designer: "Crepe",
  Handloom: "Cotton",
  Linen: "Linen",
  "Floral Print": "Organza",
  Embroidery: "Silk",
  Festive: "Silk",
  "South Indian": "Silk",
  Bengali: "Cotton",
  Gujarati: "Cotton",
  Bollywood: "Net",
  Traditional: "Silk",
};

const occasionByCategory: Record<string, string> = {
  Banarasi: "Wedding",
  Kanjivaram: "Wedding",
  Silk: "Festive",
  Cotton: "Casual",
  Chiffon: "Party",
  Georgette: "Party",
  Organza: "Festive",
  Bridal: "Bridal",
  "Party Wear": "Party",
  Designer: "Party",
  Handloom: "Office",
  Linen: "Casual",
  "Floral Print": "Casual",
  Embroidery: "Wedding",
  Festive: "Festive",
  "South Indian": "Festive",
  Bengali: "Festive",
  Gujarati: "Festive",
  Bollywood: "Party",
  Traditional: "Festive",
};

// Deterministic pseudo-random for stable rendering
const rand = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const generateProducts = (): Product[] => {
  const list: Product[] = [];
  let id = 1;
  for (const cat of categories.slice(1)) {
    const names = seedNames[cat] ?? [cat];
    const { primary, gallery } = imageByCategory(cat);
    for (let i = 0; i < 6; i++) {
      const r = rand(id * 13.37);
      const basePrice = Math.round((1499 + r * 28500) / 100) * 100 + 99;
      const discount = Math.floor(15 + rand(id * 7.1) * 45); // 15-60%
      const mrp = Math.round((basePrice / (1 - discount / 100)) / 100) * 100;
      const rating = +(3.8 + rand(id * 2.7) * 1.2).toFixed(1);
      const reviews = Math.floor(40 + rand(id * 5.5) * 2400);
      const stock = Math.floor(2 + rand(id * 9.9) * 80);
      const colorCount = 2 + Math.floor(rand(id * 3.3) * 3);
      const colors = Array.from({ length: colorCount }, (_, k) => palette[(id + k) % palette.length]);
      const name = `${names[i % names.length]} ${cat} Saree`;
      list.push({
        id: String(id),
        name,
        price: basePrice,
        mrp,
        image: primary,
        gallery,
        category: cat,
        fabric: fabricByCategory[cat] ?? "Silk",
        occasion: occasionByCategory[cat] ?? "Festive",
        colors,
        rating,
        reviews,
        stock,
        description: `A breathtaking ${cat.toLowerCase()} saree crafted with meticulous detailing. ${
          fabricByCategory[cat]
        } fabric with traditional motifs, perfect for ${occasionByCategory[cat]?.toLowerCase()} occasions. Comes with an unstitched blouse piece.`,
        isNew: id % 9 === 0,
        isBestseller: id % 7 === 0,
      });
      id++;
    }
  }
  return list;
};

export const products: Product[] = generateProducts();

export const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const discountPct = (p: Product) => Math.round(((p.mrp - p.price) / p.mrp) * 100);
