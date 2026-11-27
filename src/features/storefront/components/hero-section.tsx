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
    <section className="store-hero relative isolate flex min-h-[500px] items-end overflow-hidden border-b border-[#292929] sm:min-h-[580px] lg:min-h-[min(78vh,840px)]">
      {/* Background Campaign Photography */}
      <Image
        src={heroImage}
        alt="Classified. campaign featuring signature hoodie and sunglasses"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="store-hero-image -z-20 object-cover object-[78%_center] sm:object-[68%_center]"
      />

      {/* Ghosted Giant C Brand Mark on Concrete Wall */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[2%] top-[1%] -z-15 h-[62%] w-auto select-none opacity-45 mix-blend-screen sm:right-[8%] sm:top-[3%] sm:h-[72%] lg:right-[15%] lg:top-[4%] lg:h-[82%]"
      >
        <svg
          viewBox="0 0 33.5 67"
          className="h-full w-auto fill-[#03bf93]/85 drop-shadow-[0_0_60px_rgba(3,191,147,0.35)]"
        >
          <path d="M 33.5,0 C 15,0 0,15 0,33.5 C 0,52 15,67 33.5,67 L 33.5,47 C 26,47 20,41 20,33.5 C 20,26 26,20 33.5,20 Z" />
        </svg>
      </div>

      {/* Atmospheric Contrast Gradient */}
      <div aria-hidden="true" className="store-hero-shade absolute inset-0 -z-10" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-8 pt-20 sm:px-8 sm:pb-16 sm:pt-24 lg:px-16 lg:pb-[clamp(68px,11vh,140px)] lg:pt-28">
        <div className="max-w-[340px] xs:max-w-[380px] sm:max-w-[560px] motion-safe:animate-[cb-land-in_0.55s_ease-out_both]">
          {/* Eyebrow: Badge + Horizontal Rule + Founder Edit Badge */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-white sm:text-[13px] md:text-[14px]">
              {campaign.badge}
            </span>
            <span className="h-[1.5px] w-10 bg-white/80 sm:w-16 md:w-20" aria-hidden="true" />

            {/* Founder Controls Badge */}
            <button
              type="button"
              onClick={() => setIsEditorOpen(true)}
              className="group ml-auto inline-flex items-center gap-1.5 rounded-full border border-[#03bf93]/40 bg-black/60 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#03bf93] backdrop-blur-md transition-all hover:border-[#03bf93] hover:bg-[#03bf93]/10 hover:text-white sm:text-[9.5px]"
              title="Founder Campaign Dashboard (Visual Editor)"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#03bf93] animate-pulse" />
              <span>Founder Edit</span>
            </button>
          </div>

          {/* Subtitle */}
          <p className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.24em] text-[#9ca3af] sm:text-[11px] md:text-[12px]">
            {campaign.subtitle}
          </p>

          {/* 50% OFF Giant Lockup */}
          {campaign.showDiscount && (
            <div className="mt-2.5 flex items-start gap-1 select-none leading-none sm:mt-3 sm:gap-2">
              {/* Giant Discount Number */}
              <span className="text-[clamp(4.2rem,12.8vw,8.6rem)] font-black italic tracking-[-0.045em] text-[#03bf93] leading-[0.84] drop-shadow-[0_4px_30px_rgba(3,191,147,0.38)]">
                {campaign.discountNumber}
              </span>

              {/* Stacked % and OFF */}
              <div className="flex flex-col justify-between py-1 leading-none self-stretch pb-1">
                <span className="text-[clamp(1.7rem,4.8vw,3.2rem)] font-black italic text-[#03bf93] leading-none">
                  {campaign.discountSymbol}
                </span>
                <span className="text-[clamp(1.5rem,4.2vw,2.8rem)] font-black italic tracking-tight text-white leading-none">
                  {campaign.discountUnit}
                </span>
              </div>
            </div>
          )}

          {/* Main Manifesto Headline */}
          <h1 className="mt-2 text-[clamp(2.3rem,6.8vw,5.8rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.045em] text-white sm:mt-3">
            <span className="block">{campaign.titleLine1}</span>
            <span className="block">{campaign.titleLine2}</span>
          </h1>

          {/* Emerald Brand Accent Bar */}
          <div
            aria-hidden="true"
            className="mt-3.5 h-[3.5px] w-11 rounded-full bg-[#03bf93] shadow-[0_0_14px_rgba(3,191,147,0.85)] sm:mt-4 sm:h-[4px] sm:w-14"
          />

          {/* Duration Date Row */}
          {campaign.showDuration && (
            <div className="mt-3.5 flex items-center gap-2 text-zinc-300 sm:mt-4">
              <StoreIcon name="calendar" size={15} className="text-[#03bf93]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#e0e0e0] sm:text-[11.5px]">
                {campaign.durationDate}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          {campaign.showButtons && (
            <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3">
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