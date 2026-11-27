export type StoreCategoryId = "tees" | "hoodies" | "cargo" | "accessories";

export type StoreProduct = {
  id: string;
  name: string;
  category: StoreCategoryId;
  price?: number;
  image: string;
  imageAlt: string;
  label?: string;
  comingSoon?: boolean;
};

export const storeCategories: {
  id: StoreCategoryId;
  name: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    id: "tees",
    name: "Oversized Tees",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Monochrome editorial photograph of a premium T-shirt",
  },
  {
    id: "hoodies",
    name: "Hoodies",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Model wearing a dark streetwear hoodie",
  },
  {
    id: "cargo",
    name: "Cargo",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Editorial streetwear look with relaxed silhouette",
  },
  {
    id: "accessories",
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Minimal sunglasses photographed in a dark editorial style",
  },
];

export const storeProducts: StoreProduct[] = [
  {
    id: "core-oversized-tee",
    name: "Core Oversized Tee",
    category: "tees",
    price: 2490,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&h=1125&q=80",
    imageAlt: "Core oversized T-shirt in a monochrome product editorial",
    label: "New",
  },
  {
    id: "signature-hoodie",
    name: "Signature Hoodie",
    category: "hoodies",
    price: 4490,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&h=1125&q=80",
    imageAlt: "Signature dark hoodie in a streetwear editorial",
    label: "New",
  },
  {
    id: "utility-cargo-pant",
    name: "Utility Cargo Pant",
    category: "cargo",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&h=1125&q=80",
    imageAlt: "Utility-inspired fashion pieces in a neutral palette",
    comingSoon: true,
  },
  {
    id: "classified-beanie",
    name: "Classified Beanie",
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&h=1125&q=80",
    imageAlt: "Close-up of a minimal dark fashion accessory",
    comingSoon: true,
  },
];

export function formatBDT(amount: number) {
  return `৳${new Intl.NumberFormat("en-BD").format(amount)}`;
}
