"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { StoreIcon } from "./store-icon";
import {
  defaultHeroCampaign,
  getStoredHeroCampaign,
  type HeroCampaignData,
} from "../data/hero-campaign";
import { FounderCampaignDrawer } from "./founder-campaign-drawer";

const heroBgMobile = "/images/hero-bg.webp";
const heroSubjectMobile = "/images/hero-subject.webp";
const heroBgDesktop = "/images/hero-bg-desktop.webp?v=5";
const heroSubjectDesktop = "/images/hero-subject-desktop.webp?v=5";

export function HeroSection() {
  const [campaign, setCampaign] = useState<HeroCampaignData>(defaultHeroCampaign);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setCampaign(getStoredHeroCampaign());

    // Secret founder shortcut: Ctrl+Shift+F or ?founder=1 in URL
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setIsEditorOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("founder") === "1" || params.get("edit") === "1") {
        setIsEditorOpen(true);
      }
    }

    // Scroll parallax tracker for both smartphone and desktop
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (window.scrollY < 1200) {
          setScrollY(window.scrollY);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Gyroscope / device tilt spatial parallax on smartphones
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      const x = Math.max(-1, Math.min(1, e.gamma / 25));
      const y = Math.max(-1, Math.min(1, (e.beta - 45) / 25));
      setMouseOffset({ x, y });
    };

    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("scroll", handleScroll);
      if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Subtle interactive 3D spatial parallax on desktop pointer hover
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 });
  }, []);

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="store-hero relative isolate flex min-h-[max(64vh,500px)] items-start overflow-hidden border-b border-[#292929] sm:min-h-[580px] sm:items-end lg:min-h-[min(78vh,840px)]"
    >
      {/* 1. Background Layer: Concrete Architectural Wall */}
      <div
        className="pointer-events-none absolute -inset-4 sm:-inset-8 scale-[1.04] sm:scale-105 -z-30 transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate3d(${mouseOffset.x * 10}px, ${mouseOffset.y * 6 + scrollY * 0.16}px, 0)`,
        }}
      >
        {/* Mobile Background (< 640px) */}
        <Image
          src={heroBgMobile}
          alt="Concrete architectural backdrop"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hero-animate-bg object-cover object-[center_18%] sm:hidden"
        />
        {/* Desktop Background (>= 640px) */}
        <Image
          src={heroBgDesktop}
          alt="Concrete architectural backdrop"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hero-animate-bg hidden object-cover object-right-bottom sm:block"
        />
      </div>

      {/* 2. Middle Layer: Ghosted Giant C Brand Mark (strictly BEHIND subject) */}
      <div
        aria-hidden="true"
        className="hero-animate-ghost pointer-events-none absolute right-[-2%] top-[-1%] -z-20 h-[58%] w-auto select-none opacity-50 mix-blend-screen transition-transform duration-500 ease-out sm:right-[4%] sm:top-[5%] sm:h-[64%] lg:right-[4%] lg:top-[5%] lg:h-[66%] will-change-transform"
        style={{
          transform: `translate3d(${mouseOffset.x * 18}px, ${mouseOffset.y * 10 + scrollY * 0.26}px, 0)`,
        }}
      >
        <svg
          viewBox="0 0 33.5 67"
          className="h-full w-auto fill-[#03bf93]/85"
        >
          <path d="M 33.5,0 C 15,0 0,15 0,33.5 C 0,52 15,67 33.5,67 L 33.5,47 C 26,47 20,41 20,33.5 C 20,26 26,20 33.5,20 Z" />
        </svg>
      </div>

      {/* 3. Foreground Layer: Model Subject (Cutout) */}
      <div
        className="pointer-events-none absolute -inset-4 sm:-inset-8 scale-[1.04] sm:scale-105 -z-10 transition-transform duration-500 ease-out will-change-transform"
        style={{
          transform: `translate3d(${mouseOffset.x * -12}px, ${mouseOffset.y * -8 + scrollY * 0.08}px, 0)`,
        }}
      >
        {/* Mobile Subject (< 640px) */}
        <Image
          src={heroSubjectMobile}
          alt="Classified. campaign featuring signature hoodie and sunglasses"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hero-animate-subject object-cover object-[center_18%] sm:hidden"
        />
        {/* Desktop Subject (>= 640px) */}
        <Image
          src={heroSubjectDesktop}
          alt="Classified. campaign featuring signature hoodie and sunglasses"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hero-animate-subject hidden object-cover object-right-bottom sm:block"
        />
      </div>

      {/* 4. Atmospheric Contrast Gradient (anchors left readability) */}
      <div aria-hidden="true" className="store-hero-shade absolute inset-0 -z-[5]" />

      {/* 5. Typography & Campaign Content Layer */}
      <div
        className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pt-[clamp(72px,10vh,96px)] pb-10 sm:px-8 sm:pb-20 sm:pt-24 lg:px-16 lg:pb-[clamp(76px,12vh,150px)] lg:pt-28 will-change-transform"
        style={{
          transform: `translate3d(0, ${scrollY * 0.18}px, 0)`,
          opacity: Math.max(0, 1 - scrollY / 600),
        }}
      >
        <div className="max-w-[min(88vw,340px)] sm:max-w-[560px]">
          {/* Eyebrow: Badge + Horizontal Rule */}
          <div className="flex items-center gap-2.5 sm:gap-3 [animation:hero-text-reveal_0.7s_cubic-bezier(0.16,1,0.3,1)_0.28s_both]">
            <span className="text-[clamp(10px,2.8vw,12px)] font-extrabold uppercase tracking-[0.26em] text-white sm:text-[13px] md:text-[14px]">
              {campaign.badge}
            </span>
            <span className="h-[1.5px] w-[clamp(32px,8vw,52px)] bg-white/80 sm:w-16 md:w-20 [animation:hero-line-draw_0.7s_cubic-bezier(0.16,1,0.3,1)_0.34s_both]" aria-hidden="true" />
          </div>

          {/* Subtitle */}
          <p className="mt-1 text-[clamp(9px,2.4vw,10.5px)] font-semibold uppercase tracking-[0.24em] text-[#9ca3af] sm:text-[11px] md:text-[12px] [animation:hero-text-reveal_0.7s_cubic-bezier(0.16,1,0.3,1)_0.4s_both]">
            {campaign.subtitle}
          </p>

          {/* 50% OFF Giant Lockup */}
          {campaign.showDiscount && (
            <div className="mt-2 flex items-start gap-1 select-none leading-none sm:mt-3 sm:gap-2 [animation:hero-discount-pop_0.85s_cubic-bezier(0.16,1,0.3,1)_0.48s_both]">
              {/* Giant Discount Number */}
              <span className="text-[clamp(3.4rem,16vw,5.2rem)] font-black italic tracking-[-0.045em] text-[#03bf93] leading-[0.84] sm:text-[clamp(4.2rem,12.8vw,8.6rem)]">
                {campaign.discountNumber}
              </span>

              {/* Stacked % and OFF */}
              <div className="flex flex-col justify-between self-stretch pb-0.5 leading-none sm:pb-1">
                <span className="text-[clamp(2.1rem,10vw,3.2rem)] font-black italic text-[#03bf93] leading-[0.82] sm:text-[clamp(2.6rem,8vw,4.6rem)]">
                  {campaign.discountSymbol}
                </span>
                <span className="text-[clamp(1.05rem,5vw,1.6rem)] font-black italic tracking-tight text-white leading-none sm:text-[clamp(1.4rem,4.2vw,2.4rem)]">
                  {campaign.discountUnit}
                </span>
              </div>
            </div>
          )}

          {/* Main Manifesto Headline */}
          <h1 className="mt-1.5 text-[clamp(1.85rem,8.4vw,2.75rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.045em] text-white sm:mt-3 sm:text-[clamp(2.3rem,6.8vw,5.8rem)] [animation:hero-text-reveal_0.75s_cubic-bezier(0.16,1,0.3,1)_0.58s_both]">
            <span className="block">{campaign.titleLine1}</span>
            <span className="block">{campaign.titleLine2}</span>
          </h1>

          {/* Emerald Brand Accent Bar */}
          <div
            aria-hidden="true"
            className="mt-3 h-[3px] w-[clamp(32px,8vw,44px)] rounded-full bg-[#03bf93] sm:mt-4 sm:h-[4px] sm:w-14 [animation:hero-bar-grow_0.7s_cubic-bezier(0.16,1,0.3,1)_0.68s_both]"
          />

          {/* Duration Date Row */}
          {campaign.showDuration && (
            <div className="mt-3 flex items-center gap-1.5 text-zinc-300 sm:mt-4 sm:gap-2 [animation:hero-text-reveal_0.7s_cubic-bezier(0.16,1,0.3,1)_0.76s_both]">
              <StoreIcon name="calendar" size={14} className="text-[#03bf93]" />
              <span className="text-[clamp(9.5px,2.6vw,11px)] font-bold uppercase tracking-[0.22em] text-[#e0e0e0] sm:text-[11.5px]">
                {campaign.durationDate}
              </span>
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
