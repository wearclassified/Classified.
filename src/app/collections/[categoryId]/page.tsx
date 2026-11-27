import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionPage } from "@/features/storefront/components/catalog-pages";
import { StorefrontPageShell } from "@/features/storefront/components/storefront-page-shell";
import { storeCategories } from "@/features/storefront/data/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return storeCategories.map(({ id }) => ({ categoryId: id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}): Promise<Metadata> {
  const { categoryId } = await params;
  const category = storeCategories.find((item) => item.id === categoryId);
  return { title: category?.name ?? "Collection" };
}

export default async function CollectionRoute({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  if (!storeCategories.some((category) => category.id === categoryId)) notFound();

  return (
    <StorefrontPageShell>
      <CollectionPage categoryId={categoryId} />
    </StorefrontPageShell>
  );
}
