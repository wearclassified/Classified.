"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CloseIcon, MoonIcon, SunIcon } from "@/components/icons";
import type { ThemePreference } from "@/lib/theme";
import { applyTheme, getStoredTheme } from "@/lib/theme";

type SettingsModalProps = {
  open: boolean;
  onClose: () => void;
};

const landIn =
  "motion-safe:animate-[cb-land-in_0.36s_ease-out_both] motion-reduce:animate-none";

const themeBtnBase =
  "group relative flex min-h-[3.25rem] flex-1 flex-col items-center justify-center gap-1 rounded-xl px-3 py-2.5 text-center outline-none transition-[color,background-color,box-shadow,transform] duration-200 ease-out sm:min-h-0 sm:flex-row sm:gap-2 sm:py-3 " +
  "focus-visible:ring-2 focus-visible:ring-zinc-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white " +
  "dark:focus-visible:ring-white/25 dark:focus-visible:ring-offset-zinc-950 " +
  "active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100";

function readActiveTheme(): ThemePreference {
  if (typeof document === "undefined") return "light";
  const stored = getStoredTheme();
  if (stored) return stored;
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const [mode, setMode] = useState<ThemePreference>(readActiveTheme);

  const selectTheme = useCallback(
    (theme: ThemePreference) => {
      applyTheme(theme);
      setMode(theme);
      onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
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
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      returnFocusRef.current?.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-md backdrop-saturate-150 transition-[backdrop-filter,filter,background-color] duration-300 ease-out motion-safe:animate-[cb-backdrop-in_0.22s_ease-out_both] dark:bg-black/55"
        aria-label="Close settings"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[min(88dvh,32rem)] w-full max-w-full overflow-y-auto overscroll-contain rounded-t-2xl border border-b-0 border-zinc-200 border-t bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-5 shadow-lg transition-[box-shadow,transform] duration-300 ease-out motion-safe:animate-[cb-modal-in_0.36s_cubic-bezier(0.16,1,0.3,1)_0.06s_both] motion-reduce:animate-none dark:border-zinc-800 dark:bg-zinc-950 sm:max-h-none sm:max-w-sm sm:rounded-2xl sm:border sm:p-6 sm:pb-6"
      >
        <div
          className={`${landIn} mb-5 flex items-start justify-between gap-4 motion-safe:[animation-delay:0.08s]`}
        >
          <h2
            id={titleId}
            className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 sm:text-xl"
          >
            Settings
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

        <fieldset
          className={`${landIn} space-y-3 border-0 p-0 motion-safe:[animation-delay:0.14s]`}
        >
          <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
            Appearance
          </legend>
          <div className="rounded-2xl bg-zinc-100/90 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-zinc-200/90 dark:bg-zinc-900/60 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] dark:ring-zinc-800">
            <div className="grid grid-cols-2 gap-0.5">
              <button
                type="button"
                onClick={() => selectTheme("light")}
                className={`${themeBtnBase} ${
                  mode === "light"
                    ? "bg-white text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.06)] ring-1 ring-zinc-200/90 dark:bg-zinc-800 dark:text-zinc-50 dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_8px_24px_rgba(0,0,0,0.35)] dark:ring-zinc-700/80"
                    : "text-zinc-500 hover:bg-white/60 hover:text-zinc-800 dark:text-zinc-500 dark:hover:bg-zinc-800/40 dark:hover:text-zinc-200"
                }`}
                aria-pressed={mode === "light"}
              >
                <SunIcon
                  className={`h-[1.125rem] w-[1.125rem] shrink-0 sm:h-5 sm:w-5 ${
                    mode === "light"
                      ? "text-amber-500 dark:text-amber-400"
                      : "text-zinc-400 group-hover:text-amber-500/90 dark:text-zinc-500 dark:group-hover:text-amber-400/80"
                  }`}
                />
                <span className="text-[11px] font-semibold leading-tight tracking-tight sm:text-sm">
                  Light
                </span>
              </button>
              <button
                type="button"
                onClick={() => selectTheme("dark")}
                className={`${themeBtnBase} ${
                  mode === "dark"
                    ? "bg-white text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.06)] ring-1 ring-zinc-200/90 dark:bg-zinc-800 dark:text-zinc-50 dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_8px_24px_rgba(0,0,0,0.35)] dark:ring-zinc-700/80"
                    : "text-zinc-500 hover:bg-white/60 hover:text-zinc-800 dark:text-zinc-500 dark:hover:bg-zinc-800/40 dark:hover:text-zinc-200"
                }`}
                aria-pressed={mode === "dark"}
              >
                <MoonIcon
                  className={`h-[1.125rem] w-[1.125rem] shrink-0 sm:h-5 sm:w-5 ${
                    mode === "dark"
                      ? "text-[#7D39EB]"
                      : "text-zinc-400 group-hover:text-[#7D39EB]/90 dark:text-zinc-500 dark:group-hover:text-[#7D39EB]/80"
                  }`}
                />
                <span className="text-[11px] font-semibold leading-tight tracking-tight sm:text-sm">
                  Dark
                </span>
              </button>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
