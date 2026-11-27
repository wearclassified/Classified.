"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { formatBDT, type StoreProduct } from "../data/catalog";
import { StoreIcon } from "./store-icon";

type SearchOverlayProps = {
  query: string;
  products: StoreProduct[];
  onQueryChange: (query: string) => void;
  onClose: () => void;
  onQuickView: (product: StoreProduct) => void;
};

export function SearchOverlay({
  query,
  products,
  onQueryChange,
  onClose,
  onQuickView,
}: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <OverlayFrame title="Search" onClose={onClose} align="top">
      <label htmlFor="store-search" className="sr-only">
        Search products
      </label>
      <div className="flex items-center gap-3 border-b border-[#444] pb-3">
        <StoreIcon name="search" className="shrink-0 text-[#aaa]" />
        <input
          ref={inputRef}
          id="store-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search the collection"
          className="min-h-10 min-w-0 flex-1 bg-transparent text-base text-white placeholder:text-[#777] focus:outline-none"
        />
      </div>
      <p className="mt-5 text-[9px] uppercase tracking-[0.2em] text-[#858585]">
        {query ? `${products.length} matching pieces` : "Preview collection"}
      </p>
      {products.length ? (
        <ul className="mt-3 divide-y divide-[#292929]">
          {products.map((product) => (
            <li key={product.id}>
              <button
                type="button"
                onClick={() => onQuickView(product)}
                className="flex w-full items-center gap-3 py-3 text-left"
              >
                <span className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md bg-[#1a1a1a]">
                  <Image src={product.image} alt="" fill unoptimized sizes="48px" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-medium text-white">{product.name}</span>
                  <span className="mt-1 block text-[10px] text-[#999]">
                    {product.comingSoon ? "Coming soon" : formatBDT(product.price ?? 0)}
                  </span>
                </span>
                <StoreIcon name="arrow-right" size={16} className="text-[#aaa]" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-8 text-sm text-[#aaa]">No pieces found. Try another search.</p>
      )}
      <p className="mt-4 text-[10px] text-[#777]">Preview catalogue only; availability is not live.</p>
    </OverlayFrame>
  );
}

export type CartLine = {
  product: StoreProduct;
  size: string;
  quantity: number;
};

type CartDrawerProps = {
  lines: CartLine[];
  onClose: () => void;
  onQuantityChange: (productId: string, size: string, change: number) => void;
};

export function CartDrawer({ lines, onClose, onQuantityChange }: CartDrawerProps) {
  const itemCount = lines.reduce((total, line) => total + line.quantity, 0);

  return (
    <OverlayFrame title={`Your bag (${itemCount})`} onClose={onClose} align="right">
      {lines.length ? (
        <>
          <ul className="mt-5 divide-y divide-[#292929]">
            {lines.map((line) => (
              <li key={`${line.product.id}-${line.size}`} className="flex gap-3 py-4">
                <span className="relative h-24 w-[72px] shrink-0 overflow-hidden rounded-md bg-[#1a1a1a]">
                  <Image
                    src={line.product.image}
                    alt=""
                    fill
                    unoptimized
                    sizes="72px"
                    className="object-cover"
                  />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-xs font-medium text-white">{line.product.name}</p>
                  <p className="mt-1 text-[10px] text-[#999]">Size {line.size}</p>
                  <p className="mt-2 text-xs text-[#ddd]">{formatBDT(line.product.price ?? 0)}</p>
                  <div className="mt-auto flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      aria-label={`Decrease ${line.product.name} quantity`}
                      onClick={() => onQuantityChange(line.product.id, line.size, -1)}
                      className="store-quantity-action"
                    >
                      <StoreIcon name="minus" size={14} />
                    </button>
                    <span aria-label={`Quantity ${line.quantity}`} className="text-xs text-white">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase ${line.product.name} quantity`}
                      onClick={() => onQuantityChange(line.product.id, line.size, 1)}
                      className="store-quantity-action"
                    >
                      <StoreIcon name="plus" size={14} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[10px] leading-5 text-[#999]">
            Preview cart only. Checkout and orders are not connected.
          </p>
        </>
      ) : (
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <StoreIcon name="bag" size={29} className="text-[#999]" />
          <p className="mt-4 text-sm text-white">Your bag is empty.</p>
          <p className="mt-2 text-xs text-[#999]">Explore the collection and add a piece.</p>
        </div>
      )}
      <div className="mt-auto border-t border-[#292929] pt-5">
        <button type="button" onClick={onClose} className="store-button-primary w-full justify-center">
          Continue exploring
          <StoreIcon name="arrow-right" size={17} />
        </button>
        <p className="mt-3 text-center text-[9px] text-[#777]">Checkout is not available in this preview.</p>
      </div>
    </OverlayFrame>
  );
}

type QuickViewProps = {
  product: StoreProduct;
  onClose: () => void;
  onAddToCart: (product: StoreProduct, size: string) => void;
};

export function QuickView({ product, onClose, onAddToCart }: QuickViewProps) {
  const [size, setSize] = useState("");

  return (
    <OverlayFrame title={product.name} onClose={onClose} align="center">
      <div className="grid gap-5 pt-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-center">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-lg bg-[#1a1a1a] sm:max-w-none">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            unoptimized
            sizes="(max-width: 639px) 65vw, 260px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#999]">Classified. preview</p>
          <h3 className="mt-2 text-lg font-semibold uppercase tracking-[0.04em] text-white">
            {product.name}
          </h3>
          {product.comingSoon ? (
            <>
              <p className="mt-3 text-sm text-[#aaa]">Coming soon</p>
              <p className="mt-3 text-xs leading-5 text-[#8c8c8c]">
                This piece is part of the upcoming preview collection and is not available to order.
              </p>
            </>
          ) : (
            <>
              <p className="mt-3 text-sm text-[#ddd]">{formatBDT(product.price ?? 0)}</p>
              <fieldset className="mt-6">
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
            </>
          )}
          <button
            type="button"
            disabled={product.comingSoon || !size}
            onClick={() => onAddToCart(product, size)}
            className="store-button-primary mt-6 w-full justify-center disabled:cursor-not-allowed disabled:opacity-40"
          >
            {product.comingSoon ? "Coming soon" : "Add to bag"}
            {!product.comingSoon ? <StoreIcon name="bag" size={17} /> : null}
          </button>
          <p className="mt-3 text-[9px] leading-4 text-[#777]">
            Preview only — no order or payment will be placed.
          </p>
        </div>
      </div>
    </OverlayFrame>
  );
}

function OverlayFrame({
  title,
  onClose,
  align,
  children,
}: {
  title: string;
  onClose: () => void;
  align: "top" | "right" | "center";
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    panelRef.current
      ?.querySelector<HTMLElement>('button:not([disabled]), input:not([disabled]), a[href]')
      ?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      returnFocus?.focus();
    };
  }, []);

  const panelPosition =
    align === "right"
      ? "items-stretch justify-end"
      : align === "top"
        ? "items-start justify-center"
        : "items-center justify-center";
  const panelSize =
    align === "right"
      ? "h-full w-full max-w-[460px]"
      : align === "top"
        ? "mt-14 w-full max-w-[700px] sm:mt-20"
        : "max-h-[90dvh] w-full max-w-[760px]";

  return (
    <div className={`fixed inset-0 z-[80] flex ${panelPosition} bg-black/70 p-0 backdrop-blur-sm sm:p-4`}>
      <button type="button" aria-label="Close dialog" onClick={onClose} className="absolute inset-0" />
      <section
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative z-10 flex flex-col overflow-y-auto border border-[#333] bg-[#101010] p-5 shadow-2xl sm:p-7 ${panelSize} ${
          align === "center" ? "rounded-xl" : align === "top" ? "rounded-xl" : "sm:rounded-l-xl"
        }`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-[#333] pb-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="store-header-action -mr-2 -mt-2"
          >
            <StoreIcon name="close" />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
