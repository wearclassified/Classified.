import Image from "next/image";
import Link from "next/link";
import { formatBDT, type StoreProduct } from "../data/catalog";
import { StoreIcon } from "./store-icon";

type FeaturedCollectionProps = {
  products: StoreProduct[];
  wishlist: Set<string>;
  showWishlistOnly: boolean;
  categoryTitle: string | null;
  onWishlistToggle: (productId: string) => void;
  onQuickView: (product: StoreProduct) => void;
  onShowAll: () => void;
};

export function FeaturedCollection({
  products,
  wishlist,
  showWishlistOnly,
  categoryTitle,
  onWishlistToggle,
  onQuickView,
  onShowAll,
}: FeaturedCollectionProps) {
  return (
    <section id="featured" className="store-container pb-12 pt-6 sm:pb-16 sm:pt-8">
      <div className="mb-5 flex items-end justify-between gap-4 border-b border-[#363636] pb-3">
        <div>
          <p className="mb-2 text-[9px] uppercase tracking-[0.23em] text-[#858585]">
            Sample catalogue · BDT
          </p>
          <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f5f5f5] sm:text-sm">
            {showWishlistOnly ? "Saved pieces" : categoryTitle ?? "Featured collection"}
          </h2>
        </div>
        <button
          type="button"
          onClick={onShowAll}
          className="inline-flex min-h-11 items-center gap-2 text-[9px] font-medium uppercase tracking-[0.14em] text-[#d0d0d0] transition-colors hover:text-white sm:text-[10px]"
        >
          View all
          <StoreIcon name="arrow-right" size={15} />
        </button>
      </div>

      {products.length ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4 lg:gap-6">
          {products.map((product) => {
            const isWishlisted = wishlist.has(product.id);
            return (
              <article key={product.id} className="group min-w-0">
                <div className="store-product-image relative aspect-[4/5] overflow-hidden rounded-lg bg-[#161616]">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    unoptimized
                    sizes="(max-width: 639px) 48vw, (max-width: 1023px) 32vw, 25vw"
                    className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.035] rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent rounded-lg" />
                  {product.label ? (
                    <span className="absolute left-2.5 top-2.5 rounded-sm bg-[#f5f5f5] px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#080808] sm:left-3 sm:top-3">
                      {product.label}
                    </span>
                  ) : null}
                  {product.comingSoon ? (
                    <span className="absolute bottom-2.5 left-2.5 rounded-sm border border-white/60 bg-black/50 px-2 py-1 text-[8px] uppercase tracking-[0.13em] text-white sm:bottom-3 sm:left-3">
                      Coming soon
                    </span>
                  ) : null}
                  <button
                    type="button"
                    aria-label={`${isWishlisted ? "Remove" : "Add"} ${product.name} ${isWishlisted ? "from" : "to"} wishlist`}
                    aria-pressed={isWishlisted}
                    onClick={() => onWishlistToggle(product.id)}
                    className={`store-icon-action absolute right-2 top-2 rounded-md sm:right-3 sm:top-3 ${isWishlisted ? "text-white" : "text-white/90"}`}
                  >
                    <StoreIcon name="heart" size={19} className={isWishlisted ? "fill-white" : ""} />
                  </button>
                  <button
                    type="button"
                    aria-label={`Quick view ${product.name}`}
                    onClick={() => onQuickView(product)}
                    className="store-product-quickview absolute bottom-2.5 right-2.5 rounded-md sm:bottom-3 sm:right-3"
                  >
                    <StoreIcon name="arrow-right" size={17} />
                  </button>
                </div>
                <Link
                  href={`/product/${product.id}/`}
                  className="mt-2 flex w-full items-start justify-between gap-2 text-left"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[9px] font-semibold uppercase tracking-[0.06em] text-[#f5f5f5] sm:text-[11px]">
                      {product.name}
                    </span>
                    <span className="mt-1 block text-[10px] text-[#a3a3a3] sm:text-xs">
                      {product.comingSoon ? "Coming soon" : formatBDT(product.price ?? 0)}
                    </span>
                  </span>
                  <StoreIcon name="arrow-right" size={15} className="mt-0.5 shrink-0 text-[#a3a3a3]" />
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-lg border border-[#292929] px-5 py-12 text-center">
          <StoreIcon name="heart" className="mx-auto text-[#8b8b8b]" size={24} />
          <p className="mt-4 text-sm text-[#d7d7d7]">Your saved pieces will appear here.</p>
          <p className="mt-2 text-xs text-[#818181]">Save a piece with the heart to keep it close.</p>
        </div>
      )}
      <p className="mt-6 text-[10px] leading-5 text-[#737373]">
        Preview catalogue only. Product availability and prices have not been connected to live inventory.
      </p>
    </section>
  );
}
