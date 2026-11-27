import Image from "next/image";
import Link from "next/link";
import { StoreIcon } from "./store-icon";

const heroImage = "/images/hero-campaign.webp";

export function HeroSection() {
  return (
    <section className="store-hero relative isolate flex min-h-[360px] items-end overflow-hidden border-b border-[#292929] sm:min-h-[460px] lg:min-h-[min(65vh,720px)]">
      <Image
        src={heroImage}
        alt="Classified. campaign featuring signature hoodie and sunglasses"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="store-hero-image -z-20 object-cover object-[78%_center] sm:object-[65%_center]"
      />
      <div aria-hidden="true" className="store-hero-shade absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-[1600px] px-4 pb-7 pt-20 sm:px-8 sm:pb-16 sm:pt-24 lg:px-16 lg:pb-[clamp(72px,12vh,150px)] lg:pt-28">
        <div className="max-w-[285px] xs:max-w-[320px] sm:max-w-[530px] motion-safe:animate-[cb-land-in_0.55s_ease-out_both]">
          <p className="mb-2.5 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#e2e2e2] sm:mb-4 sm:gap-3 sm:text-xs sm:tracking-[0.3em]">
            EST. 2024
            <span className="h-px w-8 bg-white/70 sm:w-16" />
          </p>
          <h1 className="max-w-[550px] text-[clamp(1.85rem,6.2vw,7.15rem)] font-bold leading-[0.88] tracking-[-0.065em] text-[#f5f5f5]">
            NOT FOR
            <br />
            EVERYONE.
          </h1>
          <p className="mt-2.5 max-w-[260px] text-[11px] leading-[1.45] text-[#dedede] xs:max-w-[280px] sm:mt-5 sm:max-w-[340px] sm:text-base sm:leading-6">
            A curated drop of elevated essentials, built for those who move different.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-7 sm:gap-3">
            <a
              href="#featured"
              className="store-button-primary !min-h-[38px] !px-3.5 !py-2 !text-[8.5px] sm:!min-h-[48px] sm:!px-4 sm:!py-3 sm:!text-[9px]"
            >
              Explore collection
              <StoreIcon name="arrow-right" size={15} />
            </a>
            <Link
              href="/login/"
              className="store-button-outline !min-h-[38px] !px-3.5 !py-2 !text-[8.5px] sm:!min-h-[48px] sm:!px-4 sm:!py-3 sm:!text-[9px]"
            >
              Members only
              <StoreIcon name="lock" size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
