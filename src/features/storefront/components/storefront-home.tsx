"use client";

import { useMemo, useState } from "react";
import { CategorySection } from "./category-section";
import { FeaturedCollection } from "./featured-collection";
import { HeroSection } from "./hero-section";
import { BrandManifesto } from "./brand-manifesto";
import { MembershipSection } from "./membership-section";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { StorefrontFooter } from "./storefront-footer";
import { StorefrontHeader } from "./storefront-header";
import { CartDrawer, QuickView, SearchOverlay, type CartLine } from "./storefront-overlays";
import {
  storeCategories,
  storeProducts,
  type StoreCategoryId,
  type StoreProduct,
} from "../data/catalog";

export function StorefrontHome() {
  const [selectedCategory, setSelectedCategory] = useState<StoreCategoryId | null>(null);
  const [wishlist, setWishlist] = useState<Set<string>>(() => new Set());
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<StoreProduct | null>(null);
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [announcement, setAnnouncement] = useState("");

  const visibleProducts = useMemo(
    () =>
      storeProducts.filter((product) => {
        if (showWishlistOnly) return wishlist.has(product.id);
        return selectedCategory === null || product.category === selectedCategory;
      }),
    [selectedCategory, showWishlistOnly, wishlist],
  );
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    return query
      ? storeProducts.filter((product) => product.name.toLocaleLowerCase().includes(query))
      : storeProducts;
  }, [searchQuery]);
  const cartCount = cartLines.reduce((count, line) => count + line.quantity, 0);
  const categoryTitle =
    storeCategories.find((category) => category.id === selectedCategory)?.name ?? null;

  function openSearch() {
    setCartOpen(false);
    setQuickViewProduct(null);
    setSearchOpen(true);
    setSearchQuery("");
  }

  function openCart() {
    setSearchOpen(false);
    setQuickViewProduct(null);
    setCartOpen(true);
  }

  function toggleWishlist(productId: string) {
    const isSaved = wishlist.has(productId);
    setWishlist((current) => {
      const next = new Set(current);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
    setAnnouncement(isSaved ? "Removed from saved pieces." : "Added to saved pieces.");
  }

  function addToCart(product: StoreProduct, size: string) {
    setCartLines((current) => {
      const existing = current.find((line) => line.product.id === product.id && line.size === size);
      if (existing) {
        return current.map((line) =>
          line.product.id === product.id && line.size === size
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );
      }
      return [...current, { product, size, quantity: 1 }];
    });
    setAnnouncement(`${product.name}, size ${size}, added to your preview bag.`);
    setQuickViewProduct(null);
    setCartOpen(true);
  }

  function changeCartQuantity(productId: string, size: string, change: number) {
    setCartLines((current) =>
      current
        .map((line) =>
          line.product.id === productId && line.size === size
            ? { ...line, quantity: line.quantity + change }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }

  function showSavedPieces() {
    setShowWishlistOnly((current) => !current);
    setSelectedCategory(null);
    document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
  }

  function showAllProducts() {
    setSelectedCategory(null);
    setShowWishlistOnly(false);
  }

  return (
    <div className="storefront-shell min-h-dvh bg-[#080808] text-[#f5f5f5]">
      <StorefrontHeader
        cartCount={cartCount}
        onCart={openCart}
        onSearch={openSearch}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          setShowWishlistOnly(false);
        }}
      />
      <main className="pb-16 lg:pb-0">
        <HeroSection />
        <CategorySection
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            setShowWishlistOnly(false);
          }}
        />
        <FeaturedCollection
          products={visibleProducts}
          wishlist={wishlist}
          showWishlistOnly={showWishlistOnly}
          categoryTitle={categoryTitle}
          onWishlistToggle={toggleWishlist}
          onQuickView={setQuickViewProduct}
          onShowAll={showAllProducts}
        />
        <BrandManifesto />
        <MembershipSection />
      </main>
      <StorefrontFooter />
      <MobileBottomNav
        wishlistCount={wishlist.size}
        showWishlistOnly={showWishlistOnly}
        cartCount={cartCount}
        onSearch={openSearch}
        onWishlist={showSavedPieces}
        onCart={openCart}
      />
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>

      {searchOpen ? (
        <SearchOverlay
          query={searchQuery}
          products={searchResults}
          onQueryChange={setSearchQuery}
          onClose={() => setSearchOpen(false)}
          onQuickView={(product) => {
            setSearchOpen(false);
            setQuickViewProduct(product);
          }}
        />
      ) : null}
      {cartOpen ? (
        <CartDrawer
          lines={cartLines}
          onClose={() => setCartOpen(false)}
          onQuantityChange={changeCartQuantity}
        />
      ) : null}
      {quickViewProduct ? (
        <QuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={addToCart}
        />
      ) : null}
    </div>
  );
}
