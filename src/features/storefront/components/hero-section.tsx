import Image from "next/image";
import Link from "next/link";
import { StoreIcon } from "./store-icon";

const heroImage = "/images/hero-campaign.webp";

export function HeroSection() {
  return (
    <section className="store-hero relative isolate flex min-h-[480px] items-end overflow-hidden border-b border-[#292929] sm:min-h-[560px] lg:min-h-[min(72vh,780px)]">
      <Image
        src={heroImage}
        alt="Classified. campaign photoshoot featuring signature hoodie and oversized tee"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="store-hero-image -z-20 object-cover object-[center_center] sm:object-[center_35%]"
      />
      <div aria-hidden="true" className="store-hero-shade absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-[1600px] px-5 pb-12 pt-16 sm:px-8 sm:pb-16 lg:px-16 lg:pb-[clamp(72px,12vh,150px)]">
        <div className="max-w-[530px] motion-safe:animate-[cb-land-in_0.55s_ease-out_both]">
          <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-[#e2e2e2] sm:text-xs">
            New drop 01
            <span className="h-px w-14 bg-white/70 sm:w-20" />
          </p>
          <h1 className="max-w-[550px] text-[clamp(3.2rem,8vw,7.15rem)] font-bold leading-[0.86] tracking-[-0.065em] text-[#f5f5f5]">
            NOT FOR
            <br />
            EVERYONE.
          </h1>
          <p className="mt-5 max-w-[340px] text-sm leading-6 text-[#dedede] sm:text-base">
            A curated drop of elevated essentials, built for those who move different.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#featured" className="store-button-primary">
              Explore collection
              <StoreIcon name="arrow-right" size={17} />
            </a>
            <Link href="/login/" className="store-button-outline">
              Members only
              <StoreIcon name="lock" size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
