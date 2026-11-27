import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailsPage } from "@/features/storefront/components/catalog-pages";
import { StorefrontPageShell } from "@/features/storefront/components/storefront-page-shell";
import { storeProducts } from "@/features/storefront/data/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return storeProducts.map(({ id }) => ({ productId: id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const product = storeProducts.find((item) => item.id === productId);
  return { title: product?.name ?? "Product" };
}

export default async function ProductRoute({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = storeProducts.find((item) => item.id === productId);
  if (!product) notFound();

  return (
    <StorefrontPageShell>
      <ProductDetailsPage product={product} />
    </StorefrontPageShell>
  );
}
