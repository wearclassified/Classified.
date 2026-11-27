"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { formatBDT, storeCategories, storeProducts, type StoreProduct } from "../data/catalog";
import { StoreIcon } from "./store-icon";
import { useStorefrontActions } from "./storefront-page-shell";

export function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  let products =
    selectedCategory === "all"
      ? storeProducts
      : storeProducts.filter((product) => product.category === selectedCategory);

  if (sortBy === "price-asc") {
    products = [...products].sort((a, b) => (a.price ?? 99999) - (b.price ?? 99999));
  } else if (sortBy === "price-desc") {
    products = [...products].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  }

  return (
    <div className="store-container pb-20 pt-10 sm:pb-28 sm:pt-14">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#333] pb-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#929292]">Classified. Catalogue</p>
          <h1 className="mt-2 text-3xl font-bold uppercase tracking-[-0.04em] text-white sm:text-5xl">
            Shop All
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#aaa]">
            Architectural silhouettes, heavyweight combed cotton, and strictly limited small-batch drop editions.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-[#888]">
          <span className="font-mono">{products.length} pieces</span>
          <span className="text-[#444]">|</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-md border border-[#333] bg-[#121212] px-2.5 py-1.5 text-xs uppercase tracking-wider text-white outline-none focus:border-white"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Categories Filter */}
      <nav id="categories" aria-label="Filter by category" className="flex flex-wrap gap-2 py-6">
        <CategoryFilter active={selectedCategory === "all"} onClick={() => setSelectedCategory("all")}>
          All Pieces
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

      {/* Grid */}
      {products.length ? (
        <div id="new-arrivals">
          <CatalogGrid products={products} />
        </div>
      ) : (
        <div className="rounded-lg border border-[#292929] px-5 py-16 text-center text-sm text-[#aaa]">
          <p>No pieces currently in this category.</p>
        </div>
      )}
    </div>
  );
}

export function CollectionPage({ categoryId }: { categoryId: string }) {
  const category = storeCategories.find((item) => item.id === categoryId);
  const products = storeProducts.filter((product) => product.category === categoryId);
  if (!category) return null;

  return (
    <div className="store-container pb-20 pt-10 sm:pb-28 sm:pt-14">
      {/* Category Hero Banner */}
      <div className="relative overflow-hidden rounded-xl border border-[#262626] bg-[#0d0d0d] p-6 sm:p-10 lg:p-14">
        <div className="relative z-10 max-w-xl">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#0B6B57]">Collection</p>
          <h1 className="mt-3 text-3xl font-bold uppercase tracking-[-0.04em] text-white sm:text-5xl">
            {category.name}
          </h1>
          <p className="mt-3 text-xs leading-6 text-[#aaa] sm:text-sm sm:leading-7">
            {category.description}
          </p>
          <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-wider text-[#777]">
            <span>{products.length} {products.length === 1 ? "Piece" : "Pieces"}</span>
            <span>·</span>
            <span>100% Cotton &amp; Bespoke Finishing</span>
            <span>·</span>
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>

        {/* Ambient Category Background */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-25">
          <Image
            src={category.image}
            alt=""
            fill
            unoptimized
            sizes="50vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent" />
        </div>
      </div>

      {/* Products Grid */}
      <div className="pt-10">
        {products.length ? (
          <CatalogGrid products={products} />
        ) : (
          <div className="rounded-lg border border-[#292929] px-5 py-16 text-center text-sm text-[#aaa]">
            <p>This collection is currently being prepared for the next drop.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProductDetailsPage({ product }: { product: StoreProduct }) {
  const [size, setSize] = useState("M");
  const [activeTab, setActiveTab] = useState<"specs" | "packaging" | "care" | "shipping">("specs");
  const { addToCart } = useStorefrontActions();

  // Find related products
  const relatedProducts = storeProducts.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="store-container pb-20 pt-6 sm:pb-28 sm:pt-10">
      {/* Breadcrumb */}
      <p className="mb-6 text-[10px] uppercase tracking-[0.2em] text-[#8f8f8f]">
        <Link href="/shop/" className="hover:text-white">Catalogue</Link>
        <span aria-hidden="true" className="mx-2 text-[#555]">/</span>
        <Link href={`/collections/${product.category}/`} className="capitalize hover:text-white">
          {product.category}
        </Link>
        <span aria-hidden="true" className="mx-2 text-[#555]">/</span>
        <span className="text-[#ccc]">{product.name}</span>
      </p>

      {/* Product Hero Grid */}
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left: Product Imagery */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-[#262626] bg-[#161616]">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover rounded-xl"
              priority
            />
            {product.label ? (
              <span className="absolute left-4 top-4 rounded-md bg-[#080808]/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white">
                {product.label}
              </span>
            ) : null}
            {product.comingSoon ? (
              <span className="absolute left-4 top-4 rounded-md bg-[#080808]/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#aaa]">
                Coming Soon
              </span>
            ) : null}
          </div>

          {/* Model reference note */}
          {product.modelStats && (
            <p className="border-l border-[#0B6B57] pl-3 text-[11px] leading-5 text-[#888]">
              <strong className="text-white font-medium">Fit note:</strong> {product.modelStats}
            </p>
          )}
        </div>

        {/* Right: Product Info & Buy Box */}
        <section className="flex flex-col items-start">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#0B6B57]">
            {product.tagline ?? "Classified. Essential"}
          </p>
          <h1 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">
            {product.name}
          </h1>

          <p className="mt-4 text-xl font-semibold tracking-tight text-[#f5f5f5] sm:text-2xl">
            {product.comingSoon ? "Coming Soon" : formatBDT(product.price ?? 0)}
          </p>

          {/* Key Specs Pills */}
          <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-mono uppercase text-[#bbb]">
            {product.gsm && (
              <span className="rounded-md border border-[#333] bg-[#121212] px-2.5 py-1">
                {product.gsm} GSM
              </span>
            )}
            {product.composition && (
              <span className="rounded-md border border-[#333] bg-[#121212] px-2.5 py-1">
                {product.composition}
              </span>
            )}
            {product.fit && (
              <span className="rounded-md border border-[#333] bg-[#121212] px-2.5 py-1">
                {product.fit}
              </span>
            )}
            <span className="rounded-md border border-[#333] bg-[#121212] px-2.5 py-1">
              Made in Bangladesh
            </span>
          </div>

          {/* Description */}
          <p className="mt-6 text-xs leading-6 text-[#aaa] sm:text-sm sm:leading-7">
            {product.description}
          </p>

          {/* Size Selector */}
          {!product.comingSoon && (
            <div className="mt-8 w-full border-t border-[#262626] pt-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#aaa]">
                  Select Size
                </span>
                <Link
                  href="/size-guide/"
                  className="text-[10px] uppercase tracking-wider text-[#0B6B57] underline hover:text-white"
                >
                  Size Guide &amp; Measurements
                </Link>
              </div>

              <div className="mt-3 flex flex-wrap gap-2.5">
                {["S", "M", "L", "XL"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={size === item}
                    onClick={() => setSize(item)}
                    className={`min-h-11 min-w-14 border px-4 font-mono text-xs uppercase tracking-wider transition-colors ${
                      size === item
                        ? "border-white bg-white text-black font-bold"
                        : "border-[#333] bg-[#101010] text-[#ccc] hover:border-white hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-7 w-full space-y-3">
            <button
              type="button"
              disabled={product.comingSoon || !size}
              onClick={() => addToCart(product, size)}
              className="store-button-primary min-h-12 w-full justify-center disabled:cursor-not-allowed disabled:opacity-40"
            >
              {product.comingSoon ? "Drop Coming Soon" : `Add to Bag · ${size}`}
              {!product.comingSoon && <StoreIcon name="bag" size={17} />}
            </button>

            <p className="text-center text-[10px] text-[#777]">
              Free delivery inside Dhaka on orders above ৳5,000 · 7-day hassle-free exchange
            </p>
          </div>

          {/* Interactive Information Tabs */}
          <div className="mt-10 w-full border-t border-[#262626] pt-6">
            <div className="flex flex-wrap gap-2 border-b border-[#222] pb-3 text-xs">
              {[
                { id: "specs", label: "Specifications" },
                { id: "packaging", label: "Unboxing" },
                { id: "care", label: "Garment Care" },
                { id: "shipping", label: "Shipping" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`min-h-8 px-3 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-white text-white font-bold"
                      : "text-[#777] hover:text-[#bbb]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="py-4 text-xs leading-6 text-[#aaa]">
              {activeTab === "specs" && (
                <ul className="space-y-2">
                  {product.specs?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#0B6B57] font-bold">―</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === "packaging" && (
                <p>
                  Delivered in our signature Classified matte black magnetic rigid box, wrapped in 70×90cm custom repeat pattern tissue paper, complete with certified 100% cotton hangtag and individual edition number card.
                </p>
              )}

              {activeTab === "care" && (
                <ul className="space-y-2">
                  {product.care?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#0B6B57] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === "shipping" && (
                <p>
                  Dhaka delivery within 24–48 hours (৳100 flat). Nationwide courier across Bangladesh within 2–4 business days (৳150 flat). Cash on Delivery, bKash, and cards accepted. 7-day doorstep size swap available.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Complete The Look / Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 border-t border-[#262626] pt-14">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#888]">Styling Direction</p>
          <h2 className="mt-2 text-2xl font-bold uppercase tracking-tight text-white">
            Complete The Look
          </h2>
          <div className="mt-8">
            <CatalogGrid products={relatedProducts} />
          </div>
        </div>
      )}
    </div>
  );
}

function CatalogGrid({ products }: { products: StoreProduct[] }) {
  const [wishlist, setWishlist] = useState<Set<string>>(() => new Set());

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-8">
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
        className="store-product-image relative block aspect-[4/5] overflow-hidden border border-[#222] bg-[#161616]"
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          unoptimized
          sizes="(max-width: 639px) 48vw, (max-width: 1023px) 32vw, 25vw"
          className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.035]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        {product.label ? (
          <span className="absolute left-2.5 top-2.5 bg-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.14em] text-black">
            {product.label}
          </span>
        ) : null}
        {product.comingSoon ? (
          <span className="absolute bottom-2.5 left-2.5 bg-black/80 px-2 py-1 text-[8px] uppercase tracking-[0.13em] text-[#bbb]">
            Coming soon
          </span>
        ) : null}
      </Link>
      <div className="mt-3 flex items-start justify-between gap-2">
        <Link href={`/product/${product.id}/`} className="min-w-0">
          <span className="block truncate text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:text-xs">
            {product.name}
          </span>
          <span className="mt-1 block font-mono text-[11px] text-[#a3a3a3] sm:text-xs">
            {product.comingSoon ? "Coming Soon" : formatBDT(product.price ?? 0)}
          </span>
        </Link>
        <button
          type="button"
          onClick={onToggleSaved}
          aria-pressed={saved}
          aria-label={`${saved ? "Remove" : "Save"} ${product.name}`}
          className="store-header-action -mr-2 -mt-1"
        >
          <StoreIcon name="heart" size={17} className={saved ? "fill-white" : ""} />
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
          ? "border-white bg-white text-black font-semibold"
          : "border-[#333] text-[#ccc] hover:border-white hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
