import headphones from "@/assets/product-headphones.jpg";
import smartwatch from "@/assets/product-smartwatch.jpg";
import sneakers from "@/assets/product-sneakers.jpg";
import backpack from "@/assets/product-backpack.jpg";
import sunglasses from "@/assets/product-sunglasses.jpg";
import mug from "@/assets/product-mug.jpg";
import keyboard from "@/assets/product-keyboard.jpg";
import candle from "@/assets/product-candle.jpg";

export type Product = {
  id: string;
  name: string;
  price: number; // in INR
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancel Headphones",
    price: 8999,
    image: headphones,
    category: "Electronics",
    rating: 4.7,
    reviews: 1284,
    description:
      "Studio-grade sound with adaptive noise cancellation, 40-hour battery, and plush memory-foam ear cushions for all-day comfort.",
  },
  {
    id: "2",
    name: "Aurora Smartwatch Series 6",
    price: 12499,
    image: smartwatch,
    category: "Electronics",
    rating: 4.6,
    reviews: 932,
    description:
      "Track fitness, sleep, and notifications on a vivid AMOLED display. Water resistant up to 50m with a 7-day battery.",
  },
  {
    id: "3",
    name: "Everyday Minimal Sneakers",
    price: 3499,
    image: sneakers,
    category: "Fashion",
    rating: 4.5,
    reviews: 642,
    description:
      "Soft full-grain leather uppers with a cushioned EVA sole. Designed for city walks and weekend lounging.",
  },
  {
    id: "4",
    name: "Heritage Leather Backpack",
    price: 5299,
    image: backpack,
    category: "Fashion",
    rating: 4.8,
    reviews: 412,
    description:
      "Hand-finished tan leather backpack with a padded laptop sleeve, two side pockets, and antique brass hardware.",
  },
  {
    id: "5",
    name: "Classic Optical Frames",
    price: 1899,
    image: sunglasses,
    category: "Fashion",
    rating: 4.3,
    reviews: 218,
    description:
      "Lightweight metal frames with anti-glare lenses. Timeless silhouette that pairs with any look.",
  },
  {
    id: "6",
    name: "Artisan Ceramic Mug",
    price: 549,
    image: mug,
    category: "Home",
    rating: 4.9,
    reviews: 1567,
    description:
      "Stoneware mug hand-thrown by Indian potters. 350ml capacity, microwave and dishwasher safe.",
  },
  {
    id: "7",
    name: "RGB Mechanical Keyboard",
    price: 6799,
    image: keyboard,
    category: "Electronics",
    rating: 4.6,
    reviews: 824,
    description:
      "Hot-swappable switches, double-shot PBT keycaps, and per-key RGB. Built for typists and gamers alike.",
  },
  {
    id: "8",
    name: "Amber Glass Scented Candle",
    price: 749,
    image: candle,
    category: "Home",
    rating: 4.7,
    reviews: 389,
    description:
      "Hand-poured soy wax candle with notes of sandalwood and vanilla. 45-hour burn time.",
  },
];

export const categories = ["All", "Electronics", "Fashion", "Home"];

export const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
