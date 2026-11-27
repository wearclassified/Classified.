import type { Metadata } from "next";
import { ShopPage } from "@/features/storefront/components/catalog-pages";
import { StorefrontPageShell } from "@/features/storefront/components/storefront-page-shell";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore the Classified. sample streetwear catalogue.",
};

export default function ShopRoute() {
  return (
    <StorefrontPageShell>
      <ShopPage />
    </StorefrontPageShell>
  );
}
