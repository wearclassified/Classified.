"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { formatBDT, storeCategories, storeProducts, type StoreProduct } from "../data/catalog";
import { StoreIcon } from "./store-icon";
import { useStorefrontActions } from "./storefront-page-shell";

export function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const products =
    selectedCategory === "all"
      ? storeProducts
      : storeProducts.filter((product) => product.category === selectedCategory);

  return (
    <div className="store-container pb-14 pt-10 sm:pb-20 sm:pt-14">
      <p className="text-[9px] uppercase tracking-[0.25em] text-[#929292]">Classified. preview catalogue</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4 border-b border-[#333] pb-5">
        <div>
          <h1 className="text-3xl font-semibold uppercase tracking-[-0.04em] text-white sm:text-5xl">
            Shop all
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#aaa]">
            Explore the current sample catalogue. Product details, availability, and prices are for preview only.
          </p>
        </div>
        <span className="text-[10px] uppercase tracking-[0.14em] text-[#888]">
          {products.length} pieces · BDT
        </span>
      </div>

      <nav id="categories" aria-label="Filter by category" className="flex flex-wrap gap-2 py-5">
        <CategoryFilter active={selectedCategory === "all"} onClick={() => setSelectedCategory("all")}>
          All
        </CategoryFilter>
        {storeCategories.map((category) => (
          <CategoryFilter
            key={category.id}
            active={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </CategoryFilter>
        ))}
      </nav>

      {products.length ? (
        <div id="new-arrivals">
          <CatalogGrid products={products} />
        </div>
      ) : (
        <p className="border border-[#292929] px-5 py-12 text-center text-sm text-[#aaa]">
          No pieces in this category yet.
        </p>
      )}
      <p className="mt-8 border-t border-[#292929] pt-4 text-[10px] leading-5 text-[#777]">
        This is a visual preview, not a live store. No orders or payments can be made here.
      </p>
    </div>
  );
}

export function CollectionPage({ categoryId }: { categoryId: string }) {
  const category = storeCategories.find((item) => item.id === categoryId);
  const products = storeProducts.filter((product) => product.category === categoryId);
  if (!category) return null;

  return (
    <div className="store-container pb-14 pt-10 sm:pb-20 sm:pt-14">
      <p className="text-[9px] uppercase tracking-[0.25em] text-[#929292]">Collection</p>
      <div className="mt-3 border-b border-[#333] pb-5">
        <h1 className="text-3xl font-semibold uppercase tracking-[-0.04em] text-white sm:text-5xl">
          {category.name}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#aaa]">
          Preview the pieces currently listed for this category.
        </p>
      </div>
      <div className="pt-6">
        {products.length ? (
          <CatalogGrid products={products} />
        ) : (
          <p className="border border-[#292929] px-5 py-12 text-center text-sm text-[#aaa]">
            This collection is coming soon.
          </p>
        )}
      </div>
      <p className="mt-8 text-[10px] leading-5 text-[#777]">
        Sample catalogue only. Availability and prices are not connected to live inventory.
      </p>
    </div>
  );
}

export function ProductDetailsPage({ product }: { product: StoreProduct }) {
  const [size, setSize] = useState("");
  const { addToCart } = useStorefrontActions();

  return (
    <div className="store-container pb-14 pt-6 sm:pb-20 sm:pt-10">
      <p className="mb-5 text-[9px] uppercase tracking-[0.2em] text-[#8f8f8f]">
        <Link href="/shop/" className="hover:text-white">Shop</Link>
        <span aria-hidden="true"> / </span>
        {product.category}
      </p>
      <div className="grid gap-7 sm:grid-cols-2 sm:gap-10 lg:gap-16">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden bg-[#161616]">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            unoptimized
            sizes="(max-width: 639px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {product.comingSoon ? (
            <span className="absolute left-3 top-3 bg-[#080808]/80 px-3 py-2 text-[9px] uppercase tracking-[0.14em]">
              Coming soon
            </span>
          ) : null}
        </div>
        <section className="flex flex-col items-start py-2 sm:py-8">
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#929292]">Classified. preview piece</p>
          <h1 className="mt-3 text-2xl font-semibold uppercase tracking-[0.02em] text-white sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-base text-[#dedede]">
            {product.comingSoon ? "Coming soon" : formatBDT(product.price ?? 0)}
          </p>
          <p className="mt-5 max-w-lg text-sm leading-6 text-[#aaa]">
            This listing uses preview photography and catalogue details. Confirm the final garment, materials, measurements, and price with Classified. before any real purchase.
          </p>
          {!product.comingSoon ? (
            <fieldset className="mt-8">
              <legend className="text-[9px] uppercase tracking-[0.18em] text-[#aaa]">Select size</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {["S", "M", "L", "XL"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={size === item}
                    onClick={() => setSize(item)}
                    className={`store-size-option ${size === item ? "store-size-option-active" : ""}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}
          <button
            type="button"
            disabled={product.comingSoon || !size}
            onClick={() => addToCart(product, size)}
            className="store-button-primary mt-7 w-full justify-center disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            {product.comingSoon ? "Coming soon" : "Add to preview bag"}
            {!product.comingSoon ? <StoreIcon name="bag" size={17} /> : null}
          </button>
          <p className="mt-3 text-[10px] leading-5 text-[#777]">
            No order, payment, or inventory reservation will be made.
          </p>
        </section>
      </div>
    </div>
  );
}

function CatalogGrid({ products }: { products: StoreProduct[] }) {
  const [wishlist, setWishlist] = useState<Set<string>>(() => new Set());

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4 lg:gap-6">
      {products.map((product) => (
        <CatalogCard
          key={product.id}
          product={product}
          saved={wishlist.has(product.id)}
          onToggleSaved={() =>
            setWishlist((current) => {
              const next = new Set(current);
              if (next.has(product.id)) next.delete(product.id);
              else next.add(product.id);
              return next;
            })
          }
        />
      ))}
    </div>
  );
}

function CatalogCard({
  product,
  saved,
  onToggleSaved,
}: {
  product: StoreProduct;
  saved: boolean;
  onToggleSaved: () => void;
}) {
  return (
    <article className="group min-w-0">
      <Link
        href={`/product/${product.id}/`}
        className="store-product-image relative block aspect-[4/5] overflow-hidden bg-[#161616]"
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          unoptimized
          sizes="(max-width: 639px) 48vw, (max-width: 1023px) 32vw, 25vw"
          className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.035]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        {product.comingSoon ? (
          <span className="absolute bottom-3 left-3 bg-black/70 px-2 py-1 text-[8px] uppercase tracking-[0.13em]">
            Coming soon
          </span>
        ) : null}
      </Link>
      <div className="mt-2 flex items-start justify-between gap-2">
        <Link href={`/product/${product.id}/`} className="min-w-0">
          <span className="block truncate text-[9px] font-semibold uppercase tracking-[0.06em] text-white sm:text-[11px]">
            {product.name}
          </span>
          <span className="mt-1 block text-[10px] text-[#a3a3a3] sm:text-xs">
            {product.comingSoon ? "Coming soon" : formatBDT(product.price ?? 0)}
          </span>
        </Link>
        <button
          type="button"
          onClick={onToggleSaved}
          aria-pressed={saved}
          aria-label={`${saved ? "Remove" : "Save"} ${product.name}`}
          className="store-header-action -mr-2 -mt-2"
        >
          <StoreIcon name="heart" size={18} className={saved ? "fill-white" : ""} />
        </button>
      </div>
    </article>
  );
}

function CategoryFilter({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-10 border px-3 text-[9px] uppercase tracking-[0.12em] transition-colors ${
        active
          ? "border-white bg-white text-black"
          : "border-[#444] text-[#ccc] hover:border-white hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
