"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StoreIcon } from "./store-icon";
import {
  defaultHeroCampaign,
  getStoredHeroCampaign,
  type HeroCampaignData,
} from "../data/hero-campaign";
import { FounderCampaignDrawer } from "./founder-campaign-drawer";

const heroImage = "/images/hero-campaign.webp";

export function HeroSection() {
  const [campaign, setCampaign] = useState<HeroCampaignData>(defaultHeroCampaign);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    setCampaign(getStoredHeroCampaign());
  }, []);

  return (
    <section className="store-hero relative isolate flex min-h-[560px] items-start overflow-hidden border-b border-[#292929] sm:min-h-[660px] lg:min-h-[84vh]">
      {/* Background Campaign Photography */}
      <Image
        src={heroImage}
        alt="Classified. campaign featuring signature hoodie and sunglasses"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="store-hero-image -z-20 object-cover object-[76%_18%] sm:object-[68%_24%] lg:object-[64%_28%]"
      />

      {/* Atmospheric Contrast Gradient */}
      <div aria-hidden="true" className="store-hero-shade absolute inset-0 -z-10" />

      {/* Content Container (starts in upper half with proper padding) */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pt-28 pb-12 sm:px-8 sm:pt-36 sm:pb-16 lg:px-16 lg:pt-40 lg:pb-20">
        <div className="max-w-[340px] xs:max-w-[380px] sm:max-w-[560px] motion-safe:animate-[cb-land-in_0.55s_ease-out_both]">
          {/* Eyebrow: Badge + Horizontal Rule */}
          <div className="flex items-center gap-3">
            <span className="text-[11.5px] font-extrabold uppercase tracking-[0.28em] text-white sm:text-[13px] md:text-[14px]">
              {campaign.badge}
            </span>
            <span className="h-[1.5px] w-12 bg-white/90 sm:w-16" aria-hidden="true" />
          </div>

          {/* Subtitle */}
          <p className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.26em] text-[#9ca3af] sm:text-[11px] md:text-[12px]">
            {campaign.subtitle}
          </p>

          {/* 50% OFF Giant Lockup */}
          {campaign.showDiscount && (
            <div className="mt-2 flex items-start gap-1 select-none leading-none sm:mt-2.5 sm:gap-1.5">
              {/* Giant Discount Number */}
              <span className="text-[clamp(4.4rem,12vw,8.2rem)] font-black italic tracking-[-0.04em] text-[#0dcf9d] leading-[0.82] drop-shadow-[0_4px_28px_rgba(13,207,157,0.38)]">
                {campaign.discountNumber}
              </span>

              {/* Stacked % and OFF */}
              <div className="flex flex-col justify-between self-stretch py-0.5 leading-none">
                <span className="text-[clamp(1.7rem,4.4vw,3.0rem)] font-black italic text-[#0dcf9d] leading-none">
                  {campaign.discountSymbol}
                </span>
                <span className="text-[clamp(1.4rem,3.8vw,2.6rem)] font-black italic tracking-tight text-white leading-none">
                  {campaign.discountUnit}
                </span>
              </div>
            </div>
          )}

          {/* Main Manifesto Headline */}
          <h1 className="mt-2 text-[clamp(2.3rem,6.6vw,5.6rem)] font-black uppercase leading-[0.85] tracking-[-0.04em] text-white sm:mt-3">
            <span className="block">{campaign.titleLine1}</span>
            <span className="block">{campaign.titleLine2}</span>
          </h1>

          {/* Emerald Brand Accent Bar */}
          <div
            aria-hidden="true"
            className="mt-3.5 h-[3px] w-10 rounded-full bg-[#0dcf9d] shadow-[0_0_12px_rgba(13,207,157,0.85)] sm:mt-4 sm:h-[3.5px] sm:w-12"
          />

          {/* Duration Date Row */}
          {campaign.showDuration && (
            <div className="mt-3.5 flex items-center gap-2 text-zinc-300 sm:mt-4">
              <StoreIcon name="calendar" size={14} className="text-white/80" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d4d4d8] sm:text-[11px]">
                {campaign.durationDate}
              </span>
            </div>
          )}

          {/* Optional Action Buttons (toggled via founder dashboard) */}
          {campaign.showButtons && (
            <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3">
              <a
                href={campaign.ctaLink}
                className="inline-flex h-10 items-center gap-2 border border-white bg-white px-4 text-[9.5px] font-bold uppercase tracking-[0.14em] text-black transition-all hover:bg-white/90 active:scale-[0.98] sm:h-12 sm:px-6 sm:text-[10.5px]"
              >
                <span>{campaign.ctaText}</span>
                <StoreIcon name="arrow-right" size={14} />
              </a>
              <Link
                href={campaign.secondaryLink}
                className="inline-flex h-10 items-center gap-2 border border-white/30 bg-black/40 px-4 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10 active:scale-[0.98] sm:h-12 sm:px-6 sm:text-[10.5px]"
              >
                <span>{campaign.secondaryText}</span>
                <StoreIcon name="lock" size={13} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Discreet Floating Founder Settings Trigger (subtle gear/edit at bottom right) */}
      <button
        type="button"
        onClick={() => setIsEditorOpen(true)}
        aria-label="Open Founder Campaign Dashboard"
        title="Founder Campaign Dashboard (Visual Editor)"
        className="fixed bottom-5 right-5 z-40 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/75 text-zinc-400 backdrop-blur-md opacity-40 shadow-lg transition-all duration-300 hover:scale-105 hover:border-[#0dcf9d]/70 hover:text-[#0dcf9d] hover:opacity-100"
      >
        <span className="sr-only">Founder Campaign Editor</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </button>

      {/* Founder Live Visual Campaign Drawer */}
      <FounderCampaignDrawer
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        campaign={campaign}
        onUpdate={setCampaign}
      />
    </section>
  );
}