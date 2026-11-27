"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CartDrawer,
  QuickView,
  SearchOverlay,
  type CartLine,
} from "./storefront-overlays";
import { StorefrontFooter } from "./storefront-footer";
import { StorefrontHeader } from "./storefront-header";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { storeProducts, type StoreProduct } from "../data/catalog";

type StorefrontActions = {
  addToCart: (product: StoreProduct, size: string) => void;
};

const StorefrontActionsContext = createContext<StorefrontActions | null>(null);

export function useStorefrontActions() {
  const actions = useContext(StorefrontActionsContext);
  if (!actions) {
    throw new Error("useStorefrontActions must be used within StorefrontPageShell.");
  }
  return actions;
}

export function StorefrontPageShell({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<StoreProduct | null>(null);
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [announcement, setAnnouncement] = useState("");

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    return query
      ? storeProducts.filter((product) => product.name.toLocaleLowerCase().includes(query))
      : storeProducts;
  }, [searchQuery]);
  const cartCount = cartLines.reduce((count, line) => count + line.quantity, 0);

  function addToCart(product: StoreProduct, size: string) {
    if (product.comingSoon) {
      setAnnouncement(`${product.name} is coming soon and is not orderable.`);
      return;
    }

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

  const actions = { addToCart };

  return (
    <StorefrontActionsContext.Provider value={actions}>
      <div className="storefront-shell min-h-dvh bg-[#080808] text-[#f5f5f5]">
        <StorefrontHeader
          cartCount={cartCount}
          onCart={() => {
            setSearchOpen(false);
            setCartOpen(true);
          }}
          onSearch={() => {
            setCartOpen(false);
            setSearchQuery("");
            setSearchOpen(true);
          }}
        />
        <main className="min-h-[65vh] pt-[90px] lg:pt-[106px]">{children}</main>
        <StorefrontFooter hasMobileBottomNav={true} />
        <MobileBottomNav
          cartCount={cartCount}
          onWishlist={() => {
            window.location.href = "/#featured";
          }}
          onCart={() => {
            setSearchOpen(false);
            setCartOpen(true);
          }}
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
    </StorefrontActionsContext.Provider>
  );
}
