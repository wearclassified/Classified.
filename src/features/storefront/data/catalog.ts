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
  tagline?: string;
  description?: string;
  gsm?: number;
  composition?: string;
  fit?: string;
  modelStats?: string;
  specs?: string[];
  care?: string[];
};

export const storeCategories: {
  id: StoreCategoryId;
  name: string;
  image: string;
  imageAlt: string;
  description: string;
}[] = [
  {
    id: "tees",
    name: "Oversized Tees",
    image: "/images/category-tees.webp",
    imageAlt: "Classified oversized graphic tee editorial look",
    description: "Heavyweight 280 GSM combed cotton tees engineered with relaxed boxy proportions, drop shoulders, and durable thick collars.",
  },
  {
    id: "hoodies",
    name: "Hoodies",
    image: "/images/category-hoodies.webp",
    imageAlt: "Classified signature hoodie streetwear editorial look",
    description: "Substantial 460 GSM French terry fleece hoodies with double-layered structured hoods and sculptural drape.",
  },
  {
    id: "cargo",
    name: "Cargo",
    image: "/images/category-cargo.webp",
    imageAlt: "Classified tactical utility cargo pants styling",
    description: "Wide-leg utility pants featuring articulated knees, modular 3D storage pockets, and adjustable bungee cuffs.",
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "/images/category-accessories.webp",
    imageAlt: "Classified custom acrylic streetwear accessories and charms",
    description: "Limited-edition hardware, laser-engraved acrylic charms, frosted hangtags, and presentation unboxing essentials.",
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
    tagline: "Heavyweight 280 GSM Boxy Graphic Tee",
    description:
      "Cut from ultra-dense 280 GSM compact combed cotton. Designed with dropped shoulders, elongated sleeves, and a structured 1.25\" ribbed collar that retains its shape over years of wear. Features the archival classical Greek statue artwork screen-printed across the back with subtle discharge ink for a soft, breathable hand feel.",
    gsm: 280,
    composition: "100% Combed Compact Cotton",
    fit: "Signature Oversized Boxy Silhouette",
    modelStats: "Female model is 5'8\" (172 cm) wearing Size M. Male model is 6'1\" (185 cm) wearing Size L.",
    specs: [
      "280 GSM ultra-heavyweight combed cotton jersey",
      "Pre-shrunk fabric to prevent post-wash shrinkage",
      "1.25\" thick ribbed collar with reinforced double-needle cover-stitching",
      "High-density discharge screen print on back",
      "Classified. signature 10×30mm damask woven badge at left side seam",
      "Proudly milled and crafted in Dhaka, Bangladesh",
    ],
    care: [
      "Machine wash cold (max 30°C) with like colors",
      "Wash inside out to protect graphic print",
      "Do not bleach or tumble dry high",
      "Iron on low heat; avoid direct contact with print",
      "Line dry in shade recommended",
    ],
  },
  {
    id: "signature-hoodie",
    name: "Signature Hoodie",
    category: "hoodies",
    price: 4490,
    image: "/images/product-signature-hoodie.webp",
    imageAlt: "Classified Signature Hoodie in heavy black fleece with classical Greek sculpture graphic",
    label: "New",
    tagline: "460 GSM Heavy French Terry Fleece",
    description:
      "Engineered for maximum drape and structural silhouette. Crafted from custom-knit 460 GSM combed French terry cotton with a dry, substantial hand feel. Features a double-layered crossover hood without drawstrings, dropped shoulders, relaxed kangaroo pouch, and classical Greek bust artwork with laurel sleeve embellishments.",
    gsm: 460,
    composition: "100% Combed Cotton French Terry Fleece",
    fit: "Oversized Streetwear Silhouette",
    modelStats: "Model is 6'1\" (185 cm), 74 kg wearing Size L.",
    specs: [
      "460 GSM dense loopback French terry cotton",
      "Double-layered structured hood with seamless clean finish",
      "Ribbed side panels for unrestricted natural movement",
      "High-density silk-screened classical statue artwork on front chest",
      "Laurel leaf graphic along right forearm",
      "Classified. damask woven label in neck and side hem",
      "Crafted in Dhaka, Bangladesh",
    ],
    care: [
      "Machine wash gentle cycle cold (max 30°C)",
      "Dry flat or line dry to maintain garment structure",
      "Do not tumble dry",
      "Iron on reverse at low temperature",
    ],
  },
  {
    id: "utility-cargo-pant",
    name: "Utility Cargo Pant",
    category: "cargo",
    image: "/images/product-utility-cargo-pant.webp",
    imageAlt: "Classified Utility Cargo Pant in relaxed heavyweight cotton with 3D flap pockets",
    comingSoon: true,
    tagline: "Tactical Relaxed Cotton Twill",
    description:
      "A contemporary reinterpretation of military ergonomics. Constructed from durable 320 GSM cotton twill with articulated knee pleats for a sculpted wide-leg silhouette. Equipped with 6 tactical snap-closure pockets, an elasticated waistband with internal drawcord, and adjustable bungee toggles at the hems.",
    gsm: 320,
    composition: "100% Heavyweight Cotton Twill",
    fit: "Wide-Leg Relaxed Cut with Ankle Bungee Cinch",
    modelStats: "Models wear Size M (Waist 30-32\") and Size L (Waist 33-35\").",
    specs: [
      "320 GSM rugged cotton twill construction",
      "6 functional pockets including dual 3D accordion side cargo pockets",
      "Matte black branded snap hardware",
      "Elasticated waistband with durable braided drawcord",
      "Adjustable bungee cord toggles at ankle hem for customizable taper",
      "Reinforced seat and crotch gusset for durability",
    ],
    care: [
      "Machine wash cold with similar colors",
      "Tumble dry low or hang dry",
      "Warm iron if needed",
    ],
  },
  {
    id: "classified-beanie",
    name: "Classified Beanie",
    category: "accessories",
    image: "/images/product-classified-beanie.webp",
    imageAlt: "Classified Streetwear Tag & Acrylic Accessory Charm",
    comingSoon: true,
    tagline: "Laser-Engraved Streetwear Tag & Charm",
    description:
      "An iconic brand token designed to attach to backpacks, belt loops, jackets, or keys. Precision laser-cut from 5mm optical-grade clear acrylic, UV-printed with the classical statue motif and red slash graphic, finished with a heavy-duty brushed chrome carabiner clasp.",
    composition: "5mm Optical-Grade Acrylic & Solid Steel Hardware",
    fit: "One Size · 50mm × 90mm",
    specs: [
      "5mm thick crystal-clear scratch-resistant acrylic",
      "Scratch-resistant UV cured printing with high optical clarity",
      "Spring-loaded industrial carabiner clip with 360° swivel",
      "Precision chamfered edges with polished profile",
      "Laser-engraved individual edition serial number",
    ],
    care: [
      "Wipe clean with microfiber cloth",
      "Avoid abrasive chemical solvents",
    ],
  },
];

export function formatBDT(amount: number) {
  return `৳${new Intl.NumberFormat("en-BD").format(amount)}`;
}
