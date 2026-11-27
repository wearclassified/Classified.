"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { StoreIcon } from "@/features/storefront/components/store-icon";
import {
  defaultHeroCampaign,
  getStoredHeroCampaign,
  saveStoredHeroCampaign,
  type HeroCampaignData,
} from "@/features/storefront/data/hero-campaign";

export default function FounderDashboardPage() {
  const [campaign, setCampaign] = useState<HeroCampaignData>(defaultHeroCampaign);
  const [savedNotice, setSavedNotice] = useState(false);
  const [copiedNotice, setCopiedNotice] = useState(false);

  useEffect(() => {
    setCampaign(getStoredHeroCampaign());
  }, []);

  const handleChange = <K extends keyof HeroCampaignData>(
    field: K,
    value: HeroCampaignData[K],
  ) => {
    setCampaign((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    saveStoredHeroCampaign(campaign);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2600);
  };

  const handleReset = () => {
    setCampaign(defaultHeroCampaign);
    saveStoredHeroCampaign(defaultHeroCampaign);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2600);
  };

  const handleCopyJSON = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(campaign, null, 2));
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 2600);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top Founder Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-[#222] bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-bold tracking-tight text-white hover:text-zinc-300"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded bg-[#03bf93] text-xs font-black text-black">
                C
              </span>
              <span className="font-serif italic tracking-wide">Classified.</span>
              <span className="rounded-sm border border-[#03bf93]/40 bg-[#03bf93]/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#03bf93]">
                Founder Studio
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 text-[11px] text-zinc-400 sm:flex">
              <span className="h-2 w-2 rounded-full bg-[#03bf93] animate-pulse" />
              <span>Live Campaign Synced</span>
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-sm border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white transition-all hover:border-white hover:bg-zinc-800"
            >
              <span>View Storefront</span>
              <StoreIcon name="arrow-up-right" size={13} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Studio Body */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold uppercase tracking-[0.14em] text-white sm:text-2xl">
              Hero Campaign Dashboard
            </h1>
            <p className="mt-1 text-xs text-zinc-400">
              Customize Black Friday &amp; seasonal campaigns visually. Layout, proportions and responsive styling remain permanently locked.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-sm bg-[#03bf93] px-5 py-2 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-[#02aa82] active:scale-[0.98]"
            >
              <StoreIcon name="check" size={14} />
              <span>Save Changes</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-sm border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-xs font-medium text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white"
              title="Reset to factory poster lockup"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleCopyJSON}
              className="rounded-sm border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-400 hover:text-white"
              title="Copy campaign JSON"
            >
              Copy JSON
            </button>
          </div>
        </div>

        {/* Status Alerts */}
        {savedNotice && (
          <div className="mb-6 rounded border border-[#03bf93]/40 bg-[#03bf93]/15 px-4 py-2.5 text-xs font-semibold text-[#03bf93] motion-safe:animate-[cb-fade-in_0.2s_ease-out_both]">
            ✓ Saved successfully! The storefront hero has been updated.
          </div>
        )}
        {copiedNotice && (
          <div className="mb-6 rounded border border-white/30 bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white motion-safe:animate-[cb-fade-in_0.2s_ease-out_both]">
            ✓ Campaign JSON copied to clipboard!
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Live Visual Poster Preview (5 Cols) */}
          <div className="space-y-4 lg:col-span-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-300">
                Live Storefront Preview
              </span>
              <span className="text-[10px] text-zinc-500">Updates in real time</span>
            </div>

            {/* Poster Card */}
            <div className="relative isolate aspect-[4/5] w-full overflow-hidden rounded-lg border border-[#262626] bg-[#0c0c0c] shadow-2xl">
              {/* Background Model Photo */}
              <Image
                src="/images/hero-campaign.webp"
                alt="Classified Hero Campaign"
                fill
                unoptimized
                className="object-cover object-[78%_center] opacity-85"
              />

              {/* Ghosted Giant C Mark on Wall */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[2%] top-[1%] h-[65%] w-auto opacity-45 mix-blend-screen"
              >
                <svg
                  viewBox="0 0 33.5 67"
                  className="h-full w-auto fill-[#03bf93]/85 drop-shadow-[0_0_40px_rgba(3,191,147,0.35)]"
                >
                  <path d="M 33.5,0 C 15,0 0,15 0,33.5 C 0,52 15,67 33.5,67 L 33.5,47 C 26,47 20,41 20,33.5 C 20,26 26,20 33.5,20 Z" />
                </svg>
              </div>

              {/* Contrast Gradient */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"
              />

              {/* Poster Content Lockup */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                {/* Eyebrow */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-white">
                    {campaign.badge}
                  </span>
                  <span className="h-px w-8 bg-white/80" />
                </div>

                {/* Subtitle */}
                <p className="mt-0.5 text-[8.5px] font-semibold uppercase tracking-[0.2em] text-[#9ca3af]">
                  {campaign.subtitle}
                </p>

                {/* Discount */}
                {campaign.showDiscount && (
                  <div className="mt-1.5 flex items-start gap-1 select-none leading-none">
                    <span className="text-4xl font-black italic tracking-[-0.04em] text-[#03bf93] leading-[0.84]">
                      {campaign.discountNumber}
                    </span>
                    <div className="flex flex-col justify-between self-stretch py-0.5 leading-none">
                      <span className="text-sm font-black italic text-[#03bf93]">
                        {campaign.discountSymbol}
                      </span>
                      <span className="text-xs font-black italic text-white">
                        {campaign.discountUnit}
                      </span>
                    </div>
                  </div>
                )}

                {/* Headline */}
                <h2 className="mt-1.5 text-2xl font-black uppercase leading-[0.88] tracking-tight text-white">
                  <span className="block">{campaign.titleLine1}</span>
                  <span className="block">{campaign.titleLine2}</span>
                </h2>

                {/* Green Line */}
                <div className="mt-2 h-[3px] w-9 rounded-full bg-[#03bf93]" />

                {/* Duration */}
                {campaign.showDuration && (
                  <div className="mt-2 flex items-center gap-1.5 text-zinc-300">
                    <StoreIcon name="calendar" size={12} className="text-[#03bf93]" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#e0e0e0]">
                      {campaign.durationDate}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-center text-[10px] text-zinc-500">
              Poster renders on Classified storefront with locked proportions.
            </p>
          </div>

          {/* Right Column: Visual Editor Inputs (7 Cols) */}
          <div className="space-y-6 lg:col-span-7">
            {/* 1. Header & Context */}
            <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-300">
                1. Campaign Header &amp; Subtitle
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
                    Badge / Tag (Top line)
                  </label>
                  <input
                    type="text"
                    value={campaign.badge}
                    onChange={(e) => handleChange("badge", e.target.value)}
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white focus:border-[#03bf93] focus:outline-none"
                    placeholder="BLACK FRIDAY"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
                    Subtitle (Under badge)
                  </label>
                  <input
                    type="text"
                    value={campaign.subtitle}
                    onChange={(e) => handleChange("subtitle", e.target.value)}
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-medium uppercase tracking-wider text-white focus:border-[#03bf93] focus:outline-none"
                    placeholder="SITEWIDE SALE"
                  />
                </div>
              </div>
            </div>

            {/* 2. Giant Discount Offer */}
            <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-300">
                  2. Discount Lockup (e.g. 50% OFF)
                </h3>
                <label className="flex cursor-pointer items-center gap-1.5 text-xs text-zinc-400">
                  <input
                    type="checkbox"
                    checked={campaign.showDiscount}
                    onChange={(e) => handleChange("showDiscount", e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-800 accent-[#03bf93]"
                  />
                  <span>Show Discount</span>
                </label>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-400">
                    Discount Number
                  </label>
                  <input
                    type="text"
                    value={campaign.discountNumber}
                    onChange={(e) => handleChange("discountNumber", e.target.value)}
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-center text-lg font-black italic text-[#03bf93] focus:border-[#03bf93] focus:outline-none"
                    placeholder="50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-400">
                    Symbol
                  </label>
                  <input
                    type="text"
                    value={campaign.discountSymbol}
                    onChange={(e) => handleChange("discountSymbol", e.target.value)}
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-center text-lg font-black italic text-[#03bf93] focus:border-[#03bf93] focus:outline-none"
                    placeholder="%"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-400">
                    Unit
                  </label>
                  <input
                    type="text"
                    value={campaign.discountUnit}
                    onChange={(e) => handleChange("discountUnit", e.target.value)}
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-center text-lg font-black italic text-white focus:border-[#03bf93] focus:outline-none"
                    placeholder="OFF"
                  />
                </div>
              </div>
            </div>

            {/* 3. Headline */}
            <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-300">
                3. Manifesto Headline
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
                    Headline Line 1
                  </label>
                  <input
                    type="text"
                    value={campaign.titleLine1}
                    onChange={(e) => handleChange("titleLine1", e.target.value)}
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-bold uppercase tracking-wide text-white focus:border-[#03bf93] focus:outline-none"
                    placeholder="NOT FOR"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
                    Headline Line 2
                  </label>
                  <input
                    type="text"
                    value={campaign.titleLine2}
                    onChange={(e) => handleChange("titleLine2", e.target.value)}
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-bold uppercase tracking-wide text-white focus:border-[#03bf93] focus:outline-none"
                    placeholder="EVERYONE."
                  />
                </div>
              </div>
            </div>

            {/* 4. Duration Date */}
            <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-300">
                  4. Campaign Duration Date
                </h3>
                <label className="flex cursor-pointer items-center gap-1.5 text-xs text-zinc-400">
                  <input
                    type="checkbox"
                    checked={campaign.showDuration}
                    onChange={(e) => handleChange("showDuration", e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-800 accent-[#03bf93]"
                  />
                  <span>Show Date</span>
                </label>
              </div>

              <input
                type="text"
                value={campaign.durationDate}
                onChange={(e) => handleChange("durationDate", e.target.value)}
                className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-200 focus:border-[#03bf93] focus:outline-none"
                placeholder="NOV 27 — NOV 29"
              />
            </div>

            {/* 5. Buttons */}
            <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-300">
                  5. Action Buttons (Optional)
                </h3>
                <label className="flex cursor-pointer items-center gap-1.5 text-xs text-zinc-400">
                  <input
                    type="checkbox"
                    checked={campaign.showButtons}
                    onChange={(e) => handleChange("showButtons", e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-800 accent-[#03bf93]"
                  />
                  <span>Show Buttons</span>
                </label>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  value={campaign.ctaText}
                  onChange={(e) => handleChange("ctaText", e.target.value)}
                  className="rounded border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-white focus:border-[#03bf93] focus:outline-none"
                  placeholder="Primary Button (e.g. Explore drop)"
                />
                <input
                  type="text"
                  value={campaign.secondaryText}
                  onChange={(e) => handleChange("secondaryText", e.target.value)}
                  className="rounded border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-white focus:border-[#03bf93] focus:outline-none"
                  placeholder="Secondary Button (e.g. Members only)"
                />
              </div>
            </div>

            {/* Bottom Save Bar */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-zinc-500">
                Any changes saved here persist across all visitors on this domain.
              </span>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-sm bg-[#03bf93] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-[#02aa82] active:scale-[0.98]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}