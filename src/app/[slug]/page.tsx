import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactPage, EditorialPage } from "@/features/storefront/components/editorial-page";
import { StorefrontPageShell } from "@/features/storefront/components/storefront-page-shell";

const pageSlugs = [
  "about",
  "contact",
  "faq",
  "size-guide",
  "shipping-returns",
  "privacy",
  "terms",
];

const pageTitles: Record<string, string> = {
  about: "About",
  contact: "Contact",
  faq: "FAQs",
  "size-guide": "Size guide",
  "shipping-returns": "Shipping & returns",
  privacy: "Privacy",
  terms: "Terms",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return pageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: pageTitles[slug] ?? "Classified." };
}

export default async function InformationRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!pageSlugs.includes(slug)) notFound();

  return (
    <StorefrontPageShell>
      {slug === "contact" ? <ContactPage /> : <EditorialPage slug={slug} />}
    </StorefrontPageShell>
  );
}
