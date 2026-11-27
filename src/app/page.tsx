import type { Metadata } from "next";
import { StorefrontHome } from "@/features/storefront/components/storefront-home";

export const metadata: Metadata = {
  title: "Classified. — Not for everyone",
  description:
    "Discover the Classified. streetwear preview collection: elevated essentials, intentional design, and independent style.",
};

export default function HomePage() {
  return <StorefrontHome />;
}
