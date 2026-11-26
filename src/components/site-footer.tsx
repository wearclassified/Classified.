"use client";

import { useEffect, useId, useRef, useState } from "react";
import { BdFlagIcon, CloseIcon, UsFlagIcon } from "@/components/icons";
import { SettingsModal } from "@/components/settings-modal";

/** X.com–style footer links: muted, no underline */
const linkClass =
  "inline-flex cursor-pointer items-center justify-center gap-0.5 rounded-sm px-0.5 py-0.5 text-center text-[13px] leading-5 text-zinc-600 no-underline transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300";

const textButtonClass = `${linkClass} border-0 bg-transparent font-inherit`;
const landIn =
  "motion-safe:animate-[cb-land-in_0.48s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none";

function Sep() {
  return (
    <span className="select-none px-0.5 text-[13px] text-zinc-400 dark:text-zinc-600" aria-hidden="true">
      ·
    </span>
  );
}

type LanguageModalProps = {
  open: boolean;
  onClose: () => void;
};

function LanguageModal({ open, onClose }: LanguageModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-md backdrop-saturate-150 transition-[backdrop-filter,filter,background-color] duration-400 ease-out motion-safe:animate-[cb-backdrop-in_0.28s_cubic-bezier(0.22,1,0.36,1)_both] dark:bg-black/55"
        aria-label="Close language options"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-full rounded-t-2xl border border-b-0 border-zinc-200 border-t bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-5 shadow-lg transition-[box-shadow,transform] duration-400 ease-out motion-safe:animate-[cb-modal-in_0.44s_cubic-bezier(0.22,1,0.36,1)_0.06s_both] motion-reduce:animate-none dark:border-zinc-800 dark:bg-zinc-950 sm:max-w-sm sm:rounded-2xl sm:border sm:p-6 sm:pb-6"
      >
        <div className={`${landIn} mb-5 flex items-start justify-between gap-4 motion-safe:[animation-delay:0.08s]`}>
          <h2 id={titleId} className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 sm:text-xl">
            Language
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="min-h-10 min-w-10 rounded-lg p-2 text-zinc-500 transition-all duration-200 ease-out hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 sm:min-h-0 sm:min-w-0 sm:p-1.5"
            aria-label="Close"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className={`${landIn} grid grid-cols-2 gap-2 motion-safe:[animation-delay:0.14s]`}>
          <a
            href="#currency=usd"
            className="flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-center text-[14px] leading-5 text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900 active:bg-zinc-50 active:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06392F]/30 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white dark:active:bg-white/5 dark:active:text-white dark:focus-visible:ring-[#06392F]/50"
            aria-label="Currency in USD"
            onClick={onClose}
          >
            <UsFlagIcon className="h-3.5 w-5 shrink-0 rounded-[2px]" />
            USD
            <span aria-hidden="true">$</span>
          </a>
          <a
            href="#currency=bdt"
            className="flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-center text-[14px] leading-5 text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900 active:bg-zinc-50 active:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06392F]/30 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white dark:active:bg-white/5 dark:active:text-white dark:focus-visible:ring-[#06392F]/50"
            aria-label="Currency in BDT"
            onClick={onClose}
          >
            <BdFlagIcon className="h-3.5 w-5 shrink-0 rounded-[2px]" />
            BDT
            <span aria-hidden="true">৳</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function SiteFooter() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsModalKey, setSettingsModalKey] = useState(0);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);

  const openSettings = () => {
    setSettingsModalKey((k) => k + 1);
    setSettingsOpen(true);
  };

  return (
    <>
      <footer className="w-full shrink-0" suppressHydrationWarning>
        <div suppressHydrationWarning className="mx-auto box-border max-w-[600px] px-4 py-3 sm:py-3.5 md:max-w-5xl">
          <div suppressHydrationWarning className="flex flex-col items-center justify-center gap-1.5 text-center md:flex-row md:flex-wrap md:gap-y-0">
            <nav
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 md:gap-x-0 md:gap-y-0"
              aria-label="Footer links"
            >
              {/* Responsive: language opens in a popup like settings */}
              <span className="md:hidden">
                <button
                  type="button"
                  className={textButtonClass}
                  aria-haspopup="dialog"
                  aria-expanded={languageModalOpen}
                  onClick={() => setLanguageModalOpen(true)}
                >
                  Currency
                </button>
              </span>

              {/* Desktop: show languages inline */}
              <span className="hidden md:inline">
                <a href="#currency=usd" className={linkClass} aria-label="Currency in USD">
                  <UsFlagIcon className="mr-0.5 inline-block h-3.5 w-5 shrink-0 rounded-[2px] align-middle" />
                  USD
                  <span aria-hidden="true">$</span>
                </a>
              </span>
              <span className="hidden md:inline">
                <Sep />
              </span>
              <span className="hidden md:inline">
                <a href="#currency=bdt" className={linkClass} aria-label="Currency in BDT">
                  <BdFlagIcon className="mr-0.5 inline-block h-3.5 w-5 shrink-0 rounded-[2px] align-middle" />
                  BDT
                  <span aria-hidden="true">৳</span>
                </a>
              </span>
              <span className="hidden md:inline">
                <Sep />
              </span>
              <button type="button" className={textButtonClass} onClick={openSettings}>
                Settings
              </button>
              <span className="hidden md:inline">
                <Sep />
              </span>
              <a href="#about" className={linkClass}>
                About
              </a>
              <span className="hidden md:inline">
                <Sep />
              </span>
              <a href="#terms" className={linkClass}>
                Terms
              </a>
              <span className="hidden md:inline">
                <Sep />
              </span>
              <a href="#conditions" className={linkClass}>
                Conditions
              </a>
              <span className="hidden md:inline">
                <Sep />
              </span>
              <a href="#privacy" className={linkClass}>
                Privacy
              </a>
              <span className="hidden md:inline">
                <Sep />
              </span>
              <a href="#policy" className={linkClass}>
                Policy
              </a>
              <span className="hidden md:inline">
                <Sep />
              </span>
              <a href="#help" className={linkClass}>
                Help &amp; support
              </a>
            </nav>
            <p className="m-0 text-center text-[13px] leading-5 text-zinc-500 dark:text-zinc-600">
              © {new Date().getFullYear()} Classified.
            </p>
          </div>
        </div>
      </footer>

      <SettingsModal
        key={settingsModalKey}
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
      <LanguageModal open={languageModalOpen} onClose={() => setLanguageModalOpen(false)} />
    </>
  );
}
