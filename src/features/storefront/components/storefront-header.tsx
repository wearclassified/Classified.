"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { storeCategories, type StoreProduct } from "../data/catalog";
import { StoreIcon } from "./store-icon";
import { TopAnnouncementBar } from "./top-announcement-bar";
import { NavbarSearchBar } from "./storefront-overlays";

type StorefrontHeaderProps = {
  cartCount: number;
  searchOpen: boolean;
  searchQuery: string;
  searchResults: StoreProduct[];
  onCart: () => void;
  onSearch: () => void;
  onSearchQueryChange: (query: string) => void;
  onSearchClose: () => void;
  onQuickView: (product: StoreProduct) => void;
};

const navigation = [
  { label: "Collections", href: "/shop/" },
  { label: "New Drops", href: "/shop/#new-arrivals" },
  { label: "Members", href: "/membership/" },
  { label: "About", href: "/about/" },
];

export function StorefrontHeader({
  cartCount,
  searchOpen,
  searchQuery,
  searchResults,
  onCart,
  onSearch,
  onSearchQueryChange,
  onSearchClose,
  onQuickView,
}: StorefrontHeaderProps) {
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 15);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <div className="sticky top-0 z-40 w-full -mb-14 lg:-mb-[72px]">
        <TopAnnouncementBar />
        <div className="relative z-30">
          <header
            className={`store-header hidden h-[72px] transition-all duration-300 lg:block ${
              isScrolled
                ? "border-b border-[#292929]/80 bg-[#080808]/80 backdrop-blur-md shadow-lg"
                : "border-b border-transparent bg-transparent"
            }`}
          >
            <div className="mx-auto grid h-full max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-8 xl:px-16">
              <Link href="/" aria-label="Classified home" className="inline-flex h-11 w-fit items-center leading-none">
                <BrandLogo className="text-[1.65rem] tracking-tight text-[#f5f5f5]" />
              </Link>

              <nav aria-label="Main navigation" className="flex h-full items-center gap-8">
                <div className="relative flex h-full items-center">
                  <button
                    type="button"
                    aria-expanded={shopOpen}
                    aria-haspopup="true"
                    onClick={() => setShopOpen((open) => !open)}
                    className="store-nav-link inline-flex items-center gap-1.5"
                  >
                    Shop
                    <StoreIcon name="chevron-down" size={13} />
                  </button>
                  {shopOpen ? (
                    <div className="absolute left-1/2 top-[calc(100%-1px)] w-56 -translate-x-1/2 rounded-lg border border-[#292929] bg-[#101010] py-2 shadow-2xl">
                      {storeCategories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/collections/${category.id}/`}
                          onClick={() => setShopOpen(false)}
                          className="block px-4 py-3 text-xs uppercase tracking-[0.12em] text-[#c8c8c8] transition-colors hover:bg-white/5 hover:text-white"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
                {navigation.map((item) => (
                  <Link key={item.label} href={item.href} className="store-nav-link">
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center justify-self-end gap-1">
                <SearchHeaderAction onClick={onSearch} />
                <Link
                  href="/login/"
                  aria-label="Account — log in"
                  className="store-header-action"
                >
                  <StoreIcon name="user" />
                </Link>
                <HeaderAction label={`Shopping bag, ${cartCount} items`} onClick={onCart} count={cartCount}>
                  <StoreIcon name="bag" />
                </HeaderAction>
              </div>
            </div>
          </header>

          <header
            className={`store-header flex h-14 items-center justify-between px-3.5 transition-all duration-300 lg:hidden ${
              isScrolled
                ? "border-b border-[#292929]/80 bg-[#080808]/80 backdrop-blur-md shadow-lg"
                : "border-b border-transparent bg-transparent"
            }`}
          >
            <Link href="/" aria-label="Classified home" className="inline-flex h-11 w-fit items-center leading-none">
              <BrandLogo className="text-[1.35rem] tracking-tight text-[#f5f5f5]" />
            </Link>
            <div className="flex items-center gap-0.5">
              <SearchHeaderAction onClick={onSearch} size={19} />
            </div>
          </header>

          <NavbarSearchBar
            open={searchOpen}
            query={searchQuery}
            products={searchResults}
            onQueryChange={onSearchQueryChange}
            onClose={onSearchClose}
            onQuickView={onQuickView}
          />
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/70"
            onClick={closeMobileMenu}
          />
          <nav
            aria-label="Mobile navigation"
            className="store-drawer-panel absolute inset-y-0 left-0 flex w-[min(86vw,380px)] flex-col border-r border-[#292929] bg-[#101010] px-6 pb-[max(24px,env(safe-area-inset-bottom))] pt-5"
          >
            <div className="flex items-center justify-between border-b border-[#292929] pb-5">
              <BrandLogo className="text-2xl text-[#f5f5f5]" />
              <button type="button" className="store-header-action" onClick={closeMobileMenu} aria-label="Close menu">
                <StoreIcon name="close" />
              </button>
            </div>
            <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.25em] text-[#737373]">
              Explore
            </p>
            <div className="mt-3 flex flex-col">
              {storeCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/collections/${category.id}/`}
                  onClick={closeMobileMenu}
                  className="border-b border-[#292929] py-4 text-sm uppercase tracking-[0.12em] text-[#f5f5f5]"
                >
                  {category.name}
                </Link>
              ))}
              {navigation.map((item) => (
                <Link key={item.label} href={item.href} onClick={closeMobileMenu} className="border-b border-[#292929] py-4 text-sm uppercase tracking-[0.12em] text-[#f5f5f5]">
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href="/login/"
              onClick={closeMobileMenu}
              className="mt-auto flex min-h-12 items-center justify-center gap-2 rounded-md border border-[#555] text-xs font-semibold uppercase tracking-[0.12em] text-white"
            >
              <StoreIcon name="user" size={17} />
              Account
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
}

function SearchHeaderAction({ onClick, size = 20 }: { onClick: () => void; size?: number }) {
  return (
    <button type="button" aria-label="Search" onClick={onClick} className="store-search-trigger">
      <span className="store-search-pill">
        <span aria-hidden="true" className="store-search-pill-label">
          Search...
        </span>
        <span className="store-search-pill-icon">
          <StoreIcon name="search" size={size} />
        </span>
      </span>
    </button>
  );
}

function HeaderAction({
  label,
  onClick,
  count,
  children,
}: {
  label: string;
  onClick: () => void;
  count?: number;
  children: ReactNode;
}) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="store-header-action relative">
      {children}
      {count ? (
        <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#f5f5f5] px-1 text-[9px] font-bold text-[#080808]">
          {count > 9 ? "9+" : count}
        </span>
      ) : null}
    </button>
  );
}
