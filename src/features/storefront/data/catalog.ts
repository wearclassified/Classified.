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
    image: "/images/category-tees.webp",
    imageAlt: "Classified oversized graphic tee editorial look",
  },
  {
    id: "hoodies",
    name: "Hoodies",
    image: "/images/category-hoodies.webp",
    imageAlt: "Classified signature hoodie streetwear editorial look",
  },
  {
    id: "cargo",
    name: "Cargo",
    image: "/images/category-cargo.webp",
    imageAlt: "Classified tactical utility cargo pants styling",
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "/images/category-accessories.webp",
    imageAlt: "Classified custom acrylic streetwear accessories and charms",
  },
];

export const storeProducts: StoreProduct[] = [
  {
    id: "core-oversized-tee",
    name: "Core Oversized Tee",
    category: "tees",
    price: 2490,
    image: "/images/product-core-oversized-tee.webp",
    imageAlt: "Classified Core Oversized Tee in heavyweight black cotton featuring Greek statue back print",
    label: "New",
  },
  {
    id: "signature-hoodie",
    name: "Signature Hoodie",
    category: "hoodies",
    price: 4490,
    image: "/images/product-signature-hoodie.webp",
    imageAlt: "Classified Signature Hoodie in heavy black fleece with classical Greek sculpture graphic",
    label: "New",
  },
  {
    id: "utility-cargo-pant",
    name: "Utility Cargo Pant",
    category: "cargo",
    image: "/images/product-utility-cargo-pant.webp",
    imageAlt: "Classified Utility Cargo Pant in relaxed heavyweight cotton with 3D flap pockets",
    comingSoon: true,
  },
  {
    id: "classified-beanie",
    name: "Classified Beanie",
    category: "accessories",
    image: "/images/product-classified-beanie.webp",
    imageAlt: "Classified Streetwear Tag & Acrylic Accessory Charm",
    comingSoon: true,
  },
];

export function formatBDT(amount: number) {
  return `৳${new Intl.NumberFormat("en-BD").format(amount)}`;
}
