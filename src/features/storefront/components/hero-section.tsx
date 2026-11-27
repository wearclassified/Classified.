import Image from "next/image";
import Link from "next/link";
import { StoreIcon } from "./store-icon";

const heroImage = "/images/hero-campaign.webp";

export function HeroSection() {
  return (
    <section className="store-hero relative isolate flex min-h-[400px] items-end overflow-hidden border-b border-[#292929] sm:min-h-[500px] lg:min-h-[min(68vh,740px)]">
      <Image
        src={heroImage}
        alt="Classified. campaign featuring signature hoodie and sunglasses"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="store-hero-image -z-20 object-cover object-[78%_center] sm:object-[68%_center]"
      />
      <div aria-hidden="true" className="store-hero-shade absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-[1600px] px-4 pb-8 pt-20 sm:px-8 sm:pb-16 sm:pt-24 lg:px-16 lg:pb-[clamp(72px,12vh,150px)] lg:pt-28">
        <div className="max-w-[310px] xs:max-w-[340px] sm:max-w-[530px] motion-safe:animate-[cb-land-in_0.55s_ease-out_both]">
          {/* Campaign Context Tag */}
          <div className="mb-2.5 flex items-center gap-2">
            <span className="inline-flex items-center rounded-sm border border-[#0B6B57]/40 bg-[#0B6B57]/15 px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-[0.18em] text-[#0B6B57] sm:text-[9.5px]">
              Black Friday
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#888] sm:text-[10px]">
              · EST. 2024
            </span>
          </div>

          {/* 50% Off Eyecatcher */}
          <p className="mb-1 text-[clamp(1.4rem,4.2vw,2.8rem)] font-black uppercase tracking-tight text-[#0B6B57] drop-shadow-[0_0_20px_rgba(11,107,87,0.3)]">
            50% OFF
          </p>

          {/* Main Manifesto Headline */}
          <h1 className="max-w-[550px] text-[clamp(2.1rem,6.6vw,6.5rem)] font-extrabold leading-[0.88] tracking-[-0.055em] text-[#f5f5f5]">
            NOT FOR
            <br />
            EVERYONE.
          </h1>

          {/* Minimalist Subtext */}
          <p className="mt-3 max-w-[270px] text-[11.5px] leading-[1.45] text-[#c4c4c4] sm:mt-5 sm:max-w-[340px] sm:text-base sm:leading-6">
            A curated drop of elevated essentials, built for those who move different.
          </p>

          {/* Rebuilt Minimal Aesthetic Buttons */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3">
            <a
              href="#featured"
              className="inline-flex h-10 items-center gap-2 border border-white bg-white px-4 text-[9px] font-bold uppercase tracking-[0.14em] text-black transition-all hover:bg-white/90 sm:h-12 sm:px-6 sm:text-[10px]"
            >
              <span>Explore drop</span>
              <StoreIcon name="arrow-right" size={14} />
            </a>
            <Link
              href="/login/"
              className="inline-flex h-10 items-center gap-2 border border-white/30 bg-black/40 px-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10 sm:h-12 sm:px-6 sm:text-[10px]"
            >
              <span>Members only</span>
              <StoreIcon name="lock" size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
