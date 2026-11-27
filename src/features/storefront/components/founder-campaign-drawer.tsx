"use client";

import { useEffect, useState } from "react";
import type { HeroCampaignData } from "../data/hero-campaign";
import { defaultHeroCampaign, saveStoredHeroCampaign } from "../data/hero-campaign";
import { StoreIcon } from "./store-icon";

type FounderCampaignDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  campaign: HeroCampaignData;
  onUpdate: (data: HeroCampaignData) => void;
};

export function FounderCampaignDrawer({
  isOpen,
  onClose,
  campaign,
  onUpdate,
}: FounderCampaignDrawerProps) {
  const [draft, setDraft] = useState<HeroCampaignData>(campaign);
  const [savedNotice, setSavedNotice] = useState(false);
  const [copiedNotice, setCopiedNotice] = useState(false);

  useEffect(() => {
    setDraft(campaign);
  }, [campaign]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = <K extends keyof HeroCampaignData>(
    field: K,
    value: HeroCampaignData[K],
  ) => {
    const next = { ...draft, [field]: value };
    setDraft(next);
    // Real-time live preview on storefront
    onUpdate(next);
  };

  const handleSave = () => {
    saveStoredHeroCampaign(draft);
    onUpdate(draft);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2400);
  };

  const handleReset = () => {
    setDraft(defaultHeroCampaign);
    onUpdate(defaultHeroCampaign);
    saveStoredHeroCampaign(defaultHeroCampaign);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2400);
  };

  const handleCopyJSON = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(draft, null, 2));
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 2400);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="founder-drawer-title"
      className="fixed inset-0 z-[100] flex justify-end bg-black/75 backdrop-blur-sm motion-safe:animate-[cb-fade-in_0.2s_ease-out_both]"
    >
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Slide-over panel */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-[#262626] bg-[#0c0c0c] text-white shadow-2xl motion-safe:animate-[cb-land-in_0.25s_ease-out_both]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#222] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#03bf93] shadow-[0_0_10px_#03bf93]" />
            <div>
              <h2
                id="founder-drawer-title"
                className="text-xs font-bold uppercase tracking-[0.18em] text-white"
              >
                Founder Campaign Controls
              </h2>
              <p className="text-[10px] text-zinc-400">
                Visual hero editor · Layout stays locked &amp; responsive
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close editor"
            className="rounded p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <StoreIcon name="close" size={16} />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5 text-xs scrollbar-thin">
          {/* Eyebrow / Badge */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-300">
              Badge / Eyebrow (e.g. BLACK FRIDAY)
            </label>
            <input
              type="text"
              value={draft.badge}
              onChange={(e) => handleChange("badge", e.target.value)}
              className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-medium uppercase tracking-wider text-white focus:border-[#03bf93] focus:outline-none"
              placeholder="BLACK FRIDAY"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-300">
              Subtitle (e.g. SITEWIDE SALE)
            </label>
            <input
              type="text"
              value={draft.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
              className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-medium uppercase tracking-wider text-white focus:border-[#03bf93] focus:outline-none"
              placeholder="SITEWIDE SALE"
            />
          </div>

          {/* Discount Block */}
          <div className="rounded border border-zinc-800/80 bg-zinc-900/50 p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-300">
                Discount Lockup (50% OFF)
              </span>
              <label className="flex cursor-pointer items-center gap-1.5 text-[10px] text-zinc-400">
                <input
                  type="checkbox"
                  checked={draft.showDiscount}
                  onChange={(e) => handleChange("showDiscount", e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-800 accent-[#03bf93]"
                />
                <span>Visible</span>
              </label>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-zinc-400">
                  Number
                </label>
                <input
                  type="text"
                  value={draft.discountNumber}
                  onChange={(e) => handleChange("discountNumber", e.target.value)}
                  className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-center text-sm font-black italic text-[#03bf93] focus:border-[#03bf93] focus:outline-none"
                  placeholder="50"
                />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-zinc-400">
                  Symbol
                </label>
                <input
                  type="text"
                  value={draft.discountSymbol}
                  onChange={(e) => handleChange("discountSymbol", e.target.value)}
                  className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-center text-sm font-black italic text-[#03bf93] focus:border-[#03bf93] focus:outline-none"
                  placeholder="%"
                />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-zinc-400">
                  Unit
                </label>
                <input
                  type="text"
                  value={draft.discountUnit}
                  onChange={(e) => handleChange("discountUnit", e.target.value)}
                  className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-center text-sm font-black italic text-white focus:border-[#03bf93] focus:outline-none"
                  placeholder="OFF"
                />
              </div>
            </div>
          </div>

          {/* Headline Lines */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-300">
              Headline (Line 1 &amp; Line 2)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={draft.titleLine1}
                onChange={(e) => handleChange("titleLine1", e.target.value)}
                className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-bold uppercase tracking-wide text-white focus:border-[#03bf93] focus:outline-none"
                placeholder="NOT FOR"
              />
              <input
                type="text"
                value={draft.titleLine2}
                onChange={(e) => handleChange("titleLine2", e.target.value)}
                className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-bold uppercase tracking-wide text-white focus:border-[#03bf93] focus:outline-none"
                placeholder="EVERYONE."
              />
            </div>
          </div>

          {/* Duration Date */}
          <div className="rounded border border-zinc-800/80 bg-zinc-900/50 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-300">
                Campaign Duration
              </span>
              <label className="flex cursor-pointer items-center gap-1.5 text-[10px] text-zinc-400">
                <input
                  type="checkbox"
                  checked={draft.showDuration}
                  onChange={(e) => handleChange("showDuration", e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-800 accent-[#03bf93]"
                />
                <span>Visible</span>
              </label>
            </div>
            <input
              type="text"
              value={draft.durationDate}
              onChange={(e) => handleChange("durationDate", e.target.value)}
              className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-200 focus:border-[#03bf93] focus:outline-none"
              placeholder="NOV 27 — NOV 29"
            />
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 pt-1">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-300">
                Primary Button Label &amp; Link
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={draft.ctaText}
                  onChange={(e) => handleChange("ctaText", e.target.value)}
                  className="rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-white focus:border-[#03bf93] focus:outline-none"
                  placeholder="Explore drop"
                />
                <input
                  type="text"
                  value={draft.ctaLink}
                  onChange={(e) => handleChange("ctaLink", e.target.value)}
                  className="rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 focus:border-[#03bf93] focus:outline-none"
                  placeholder="#featured"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-300">
                Secondary Button Label &amp; Link
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={draft.secondaryText}
                  onChange={(e) => handleChange("secondaryText", e.target.value)}
                  className="rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-white focus:border-[#03bf93] focus:outline-none"
                  placeholder="Members only"
                />
                <input
                  type="text"
                  value={draft.secondaryLink}
                  onChange={(e) => handleChange("secondaryLink", e.target.value)}
                  className="rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 focus:border-[#03bf93] focus:outline-none"
                  placeholder="/login/"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-[#222] bg-[#0f0f0f] px-6 py-4 space-y-2">
          {savedNotice && (
            <p className="text-center text-[11px] font-bold text-[#03bf93] motion-safe:animate-pulse">
              ✓ Applied &amp; saved to browser storage!
            </p>
          )}
          {copiedNotice && (
            <p className="text-center text-[11px] font-bold text-white motion-safe:animate-pulse">
              ✓ Config JSON copied to clipboard!
            </p>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 rounded bg-[#03bf93] py-2.5 text-center text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-[#02aa82] active:scale-[0.98]"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded border border-zinc-700 bg-zinc-800/80 px-3 py-2.5 text-xs font-medium text-zinc-300 transition-all hover:bg-zinc-700 hover:text-white"
              title="Reset to default poster lockup"
            >
              Reset
            </button>
          </div>

          <div className="flex justify-between items-center pt-1 text-[10px] text-zinc-500">
            <button
              type="button"
              onClick={handleCopyJSON}
              className="hover:text-zinc-300 underline"
            >
              Copy JSON Config
            </button>
            <span>Auto-synced</span>
          </div>
        </div>
      </div>
    </div>
  );
}