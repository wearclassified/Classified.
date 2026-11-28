import Image from "next/image";
import Link from "next/link";
import { Unbounded } from "next/font/google";
import { storeCategories } from "../data/catalog";

const categoryDisplayFont = Unbounded({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

/**
 * Four-tile editorial category grid rendered directly after the hero
 * and above Latest Drops.
 */
export function CategorySection() {
  return (
    <section
      id="categories"
      aria-label="Shop by category"
      className="mx-auto w-full max-w-[1600px] px-2 pt-2.5 sm:px-6 sm:pt-5 lg:px-16 lg:pt-7"
    >
      <div className="grid grid-cols-2 gap-1.5 sm:gap-3 lg:grid-cols-4 lg:gap-4">
        {storeCategories.map((category) => (
          <Link
            key={category.id}
            href={`/collections/${category.id}/`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-lg border border-[#262626] bg-[#101010] transition-colors duration-300 hover:border-[#404040]"
          >
            <Image
              src={category.image}
              alt={category.imageAlt}
              fill
              loading="eager"
              unoptimized
              sizes="(max-width: 1023px) 49vw, 24vw"
              className="rounded-lg object-cover object-center transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-[1.045]"
            />

            {/* Top & bottom readability scrims */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-lg bg-[linear-gradient(180deg,rgba(0,0,0,0.68)_0%,rgba(0,0,0,0.06)_32%,rgba(0,0,0,0.08)_64%,rgba(0,0,0,0.82)_100%)]"
            />

            {/* Top Centered Extended Display Category Title */}
            <span
              className={`${categoryDisplayFont.className} pointer-events-none absolute inset-x-1.5 top-3 z-10 whitespace-nowrap text-center text-[clamp(0.7rem,3.05vw,1.08rem)] font-extrabold uppercase tracking-[0.02em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:inset-x-2 sm:top-4 sm:text-[clamp(0.95rem,2.3vw,1.18rem)] lg:text-[clamp(0.84rem,1.12vw,1.15rem)]`}
            >
              {category.name}
            </span>

            {/* Bottom Bold Display Banner */}
            <span className="pointer-events-none absolute inset-x-1 bottom-1.5 z-10 whitespace-nowrap text-center text-[clamp(1.22rem,5.7vw,2.05rem)] font-black uppercase leading-[0.86] tracking-[-0.04em] text-[#03bf93] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] sm:bottom-2.5 lg:text-[clamp(1.3rem,2.1vw,2.05rem)]">
              Flat 50% Off
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
