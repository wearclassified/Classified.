"use client";

import Image from "next/image";
import Link from "next/link";
import { formatBDT, type StoreProduct } from "../data/catalog";
import { StoreIcon } from "./store-icon";

type LatestDropsSectionProps = {
  products: StoreProduct[];
  wishlist: Set<string>;
  onWishlistToggle: (productId: string) => void;
  onAddToCart: (product: StoreProduct, size: string) => void;
};

function getDiscountPercent(price?: number, originalPrice?: number): number | null {
  if (!price || !originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Drop showcase positioned directly below the hero featuring bordered cards,
 * discount pricing pills, wishlist toggles, and quick add-to-cart actions.
 */
export function LatestDropsSection({
  products,
  wishlist,
  onWishlistToggle,
  onAddToCart,
}: LatestDropsSectionProps) {
  return (
    <section id="latest-drops" aria-labelledby="latest-drops-heading" className="store-container pb-4 pt-7 sm:pb-6 sm:pt-10">
      <h2
        id="latest-drops-heading"
        className="mb-5 text-center text-xl font-extrabold italic tracking-[-0.02em] text-[#f5f5f5] sm:mb-7 sm:text-2xl lg:text-[1.75rem]"
      >
        Latest <span className="text-[#03bf93]">Drops</span>
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {products.map((product) => {
          const isWishlisted = wishlist.has(product.id);
          const discountPercent = getDiscountPercent(product.price, product.originalPrice);
          const badgeLabel = product.dropBadge ?? (product.comingSoon ? "Coming Soon" : product.label);

          return (
            <article
              key={product.id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#262626] bg-[#0e0e0e] transition-colors duration-300 hover:border-[#3d3d3d]"
            >
              {/* Framed Product Media */}
              <div className="p-2 pb-0 sm:p-2.5 sm:pb-0">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#161616]">
                  <Link href={`/product/${product.id}/`} className="block h-full w-full">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      unoptimized
                      sizes="(max-width: 639px) 46vw, (max-width: 1023px) 46vw, 24vw"
                      className="rounded-lg object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.035]"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-t from-black/25 via-transparent to-black/10"
                    />
                  </Link>

                  {badgeLabel ? (
                    <span className="pointer-events-none absolute left-2 top-2 rounded-md border border-white/15 bg-[#080808]/85 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-[#f5f5f5] backdrop-blur-sm sm:left-2.5 sm:top-2.5 sm:px-2.5 sm:py-1 sm:text-[9px]">
                      {badgeLabel}
                    </span>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => onWishlistToggle(product.id)}
                    aria-pressed={isWishlisted}
                    aria-label={`${isWishlisted ? "Remove" : "Save"} ${product.name} ${isWishlisted ? "from" : "to"} wishlist`}
                    className={`absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-[#080808]/75 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white sm:right-2.5 sm:top-2.5 sm:h-8 sm:w-8 ${
                      isWishlisted ? "text-[#03bf93]" : "text-white/85"
                    }`}
                  >
                    <StoreIcon name="heart" size={14} className={isWishlisted ? "fill-[#03bf93]" : ""} />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <Link
                href={`/product/${product.id}/`}
                className="flex flex-1 flex-col px-2.5 pb-3 pt-2.5 sm:px-3.5 sm:pb-3.5 sm:pt-3"
              >
                <h3 className="truncate text-[11px] font-extrabold uppercase tracking-[0.04em] text-[#f5f5f5] sm:text-xs">
                  {product.name}
                </h3>
                <p className="mt-0.5 truncate text-[10px] text-[#8f8f8f] sm:text-[11px]">
                  {product.categoryLabel ?? product.tagline ?? "Streetwear Essential"}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1">
                  {product.comingSoon ? (
                    <>
                      <span className="text-xs font-bold text-[#d4d4d4] sm:text-sm">
                        Coming Soon
                      </span>
                      <span className="rounded-md border border-[#333] bg-[#161616] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#9a9a9a] sm:text-[9px]">
                        Drop 01
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-xs font-bold tracking-tight text-white sm:text-sm">
                        {formatBDT(product.price ?? 0)}
                      </span>
                      {product.originalPrice ? (
                        <span className="text-[10px] text-[#737373] line-through sm:text-xs">
                          {formatBDT(product.originalPrice)}
                        </span>
                      ) : null}
                      {discountPercent ? (
                        <span className="rounded-md bg-[#03bf93] px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wide text-[#080808] sm:px-2 sm:text-[9px]">
                          {discountPercent}% OFF
                        </span>
                      ) : null}
                    </>
                  )}
                </div>
              </Link>

              {/* Full-Width Bottom Action */}
              <div className="border-t border-[#262626]">
                {product.comingSoon ? (
                  <Link
                    href={`/product/${product.id}/`}
                    className="flex min-h-10 w-full items-center justify-center text-[10px] font-bold uppercase tracking-[0.14em] text-[#a3a3a3] transition-colors hover:bg-white/5 hover:text-white sm:min-h-11 sm:text-[11px]"
                  >
                    Coming Soon
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => onAddToCart(product, "M")}
                    className="flex min-h-10 w-full items-center justify-center text-[10px] font-bold uppercase tracking-[0.14em] text-[#f5f5f5] transition-colors hover:bg-[#f5f5f5] hover:text-[#080808] sm:min-h-11 sm:text-[11px]"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
