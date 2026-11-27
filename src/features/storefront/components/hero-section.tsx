import Image from "next/image";
import Link from "next/link";
import { StoreIcon } from "./store-icon";

const heroImage = "/images/hero-campaign.webp";

export function HeroSection() {
  return (
    <section className="store-hero relative isolate flex min-h-[300px] items-end overflow-hidden border-b border-[#292929] sm:min-h-[440px] lg:min-h-[min(65vh,720px)]">
      <Image
        src={heroImage}
        alt="Classified. campaign photoshoot featuring signature hoodie and oversized tee"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="store-hero-image -z-20 object-cover object-[center_30%] sm:object-[center_35%]"
      />
      <div aria-hidden="true" className="store-hero-shade absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-[1600px] px-4 pb-8 pt-10 sm:px-8 sm:pb-16 sm:pt-16 lg:px-16 lg:pb-[clamp(72px,12vh,150px)]">
        <div className="max-w-[530px] motion-safe:animate-[cb-land-in_0.55s_ease-out_both]">
          <p className="mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-[#e2e2e2] sm:mb-5 sm:text-xs">
            Founding Collection — EST. 2024
            <span className="h-px w-14 bg-white/70 sm:w-20" />
          </p>
          <h1 className="max-w-[550px] text-[clamp(2.4rem,7.5vw,7.15rem)] font-bold leading-[0.88] tracking-[-0.065em] text-[#f5f5f5]">
            NOT FOR
            <br />
            EVERYONE.
          </h1>
          <p className="mt-4 max-w-[340px] text-xs leading-5 text-[#dedede] sm:mt-5 sm:text-base sm:leading-6">
            A curated drop of elevated essentials, built for those who move different.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
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
