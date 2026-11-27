"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { StoreIcon, type StoreIconName } from "./store-icon";

export function EditorialPage({ slug }: { slug: string }) {
  switch (slug) {
    case "about":
      return <AboutPage />;
    case "size-guide":
      return <SizeGuidePage />;
    case "shipping-returns":
      return <ShippingReturnsPage />;
    case "faq":
      return <FaqPage />;
    case "contact":
      return <ContactPage />;
    case "privacy":
      return <LegalPage type="privacy" />;
    case "terms":
      return <LegalPage type="terms" />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// ABOUT / OUR STORY PAGE
// ---------------------------------------------------------------------------
export function AboutPage() {
  return (
    <div className="store-container pb-20 pt-10 sm:pb-28 sm:pt-16">
      {/* Eyebrow and Headline */}
      <div className="max-w-3xl">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#9a9a9a]">The Manifesto · EST. 2024</p>
        <h1 className="mt-4 text-[clamp(2.5rem,6vw,4.75rem)] font-bold uppercase leading-[0.92] tracking-[-0.05em] text-[#f5f5f5]">
          NOT FOR
          <br />
          EVERYONE.
        </h1>
        <p className="mt-6 text-base leading-7 text-[#c8c8c8] sm:text-lg sm:leading-8">
          Classified. is an independent luxury streetwear house conceived in Dhaka, Bangladesh. We build high-density, sculptural everyday pieces defined by radical scarcity, classical human symmetry, and brutalist structural design.
        </p>
      </div>

      {/* Hero Visual */}
      <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden border border-[#262626] sm:mt-16 lg:aspect-[21/9]">
        <Image
          src="/images/hero-campaign.webp"
          alt="Classified campaign shoot in Dhaka"
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2 sm:bottom-6 sm:left-8 sm:right-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">
            Drop 01 · Dhaka City Campaign
          </p>
          <p className="text-[9px] uppercase tracking-[0.15em] text-white/60">
            Modelled in Classified Heavyweight Fleece & Combed Cotton
          </p>
        </div>
      </div>

      {/* Brand Pillars */}
      <div className="mt-16 border-t border-[#262626] pt-12 sm:mt-24 sm:pt-16">
        <p className="text-[9px] uppercase tracking-[0.25em] text-[#888]">Core Principles</p>
        <h2 className="mt-3 text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
          Built With Uncompromising Intention
        </h2>

        <div className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          <div className="border border-[#262626] bg-[#0e0e0e] p-6 sm:p-7">
            <span className="text-[10px] font-mono text-[#0B6B57]">01 / SCARCITY</span>
            <h3 className="mt-3 text-lg font-semibold uppercase tracking-wide text-white">
              Strict Drop Runs
            </h3>
            <p className="mt-3 text-xs leading-6 text-[#9e9e9e] sm:text-sm">
              We produce in strictly numbered small editions. No mass replication, no overproduction. Once an archival piece sells out, the pattern enters the vault permanently.
            </p>
          </div>

          <div className="border border-[#262626] bg-[#0e0e0e] p-6 sm:p-7">
            <span className="text-[10px] font-mono text-[#0B6B57]">02 / FABRIC</span>
            <h3 className="mt-3 text-lg font-semibold uppercase tracking-wide text-white">
              Heavyweight Engineering
            </h3>
            <p className="mt-3 text-xs leading-6 text-[#9e9e9e] sm:text-sm">
              280–320 GSM custom-combed compact jersey and 460 GSM French terry fleece. Structured 1.25&quot; ribbed collars that never bacon, pre-shrunk to endure lifetime wear.
            </p>
          </div>

          <div className="border border-[#262626] bg-[#0e0e0e] p-6 sm:p-7">
            <span className="text-[10px] font-mono text-[#0B6B57]">03 / HERITAGE</span>
            <h3 className="mt-3 text-lg font-semibold uppercase tracking-wide text-white">
              Proudly Made in Bangladesh
            </h3>
            <p className="mt-3 text-xs leading-6 text-[#9e9e9e] sm:text-sm">
              Milled, tailored, and hand-finished in Bangladesh — home to the world&apos;s greatest textile artisans. We celebrate local craftsmanship with global luxury standards.
            </p>
          </div>
        </div>
      </div>

      {/* The Unboxing Ritual */}
      <div className="mt-16 border-t border-[#262626] pt-12 sm:mt-24 sm:pt-16">
        <p className="text-[9px] uppercase tracking-[0.25em] text-[#888]">Craft & Presentation</p>
        <h2 className="mt-3 text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
          The Unboxing Experience
        </h2>
        <p className="mt-3 max-w-2xl text-xs leading-6 text-[#aaa] sm:text-sm">
          Every Classified garment arrives as a complete collector&apos;s artifact. We obsess over every single touchpoint from the magnetic rigid box to the custom woven labels.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group border border-[#262626] bg-[#0e0e0e] p-3 transition-colors hover:border-[#444]">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161616]">
              <Image
                src="/images/packaging-box.webp"
                alt="Classified Luxury Matte Black Magnetic Rigid Box"
                fill
                unoptimized
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h4 className="mt-3 text-xs font-semibold uppercase tracking-wider text-white">
              Magnetic Rigid Box
            </h4>
            <p className="mt-1 text-[11px] leading-5 text-[#888]">
              Matte black structure with embossed emerald emblem and folding magnetic lid.
            </p>
          </div>

          <div className="group border border-[#262626] bg-[#0e0e0e] p-3 transition-colors hover:border-[#444]">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161616]">
              <Image
                src="/images/tissue-paper.webp"
                alt="Classified Bespoke Printed Crinkle Tissue Paper"
                fill
                unoptimized
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h4 className="mt-3 text-xs font-semibold uppercase tracking-wider text-white">
              Archival Tissue Paper
            </h4>
            <p className="mt-1 text-[11px] leading-5 text-[#888]">
              70×90cm custom repeat pattern printed with deep black &amp; green vegetable inks.
            </p>
          </div>

          <div className="group border border-[#262626] bg-[#0e0e0e] p-3 transition-colors hover:border-[#444]">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161616]">
              <Image
                src="/images/packaging-tags.webp"
                alt="Classified Heavy Cotton Collar with Dual Tags"
                fill
                unoptimized
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h4 className="mt-3 text-xs font-semibold uppercase tracking-wider text-white">
              Dual Hangtags &amp; Cord
            </h4>
            <p className="mt-1 text-[11px] leading-5 text-[#888]">
              Embossed black card, metal eyelet, rope cord, and certified cotton guarantee.
            </p>
          </div>

          <div className="group border border-[#262626] bg-[#0e0e0e] p-3 transition-colors hover:border-[#444]">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161616]">
              <Image
                src="/images/care-label.webp"
                alt="Classified Proudly Made in Bangladesh Care Label"
                fill
                unoptimized
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h4 className="mt-3 text-xs font-semibold uppercase tracking-wider text-white">
              Woven Labels &amp; Badges
            </h4>
            <p className="mt-1 text-[11px] leading-5 text-[#888]">
              High-density damask side-seam badge and soft satin care instructions.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[#262626] pt-8 sm:mt-24">
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tight text-white">
            Experience Drop 01
          </h3>
          <p className="text-xs text-[#999]">Discover the current collection before sizes run out.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/shop/" className="store-button-primary">
            Explore Collection
            <StoreIcon name="arrow-right" size={16} />
          </Link>
          <Link href="/membership/" className="store-button-outline">
            Join Inner Circle
          </Link>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SIZE GUIDE PAGE
// ---------------------------------------------------------------------------
type SizeUnit = "in" | "cm";
type CategoryTab = "tees" | "hoodies" | "cargo";

export function SizeGuidePage() {
  const [unit, setUnit] = useState<SizeUnit>("in");
  const [category, setCategory] = useState<CategoryTab>("tees");

  const factor = unit === "cm" ? 2.54 : 1;
  const round = (val: number) => (unit === "cm" ? Math.round(val * factor) : val);

  return (
    <div className="store-container pb-20 pt-10 sm:pb-28 sm:pt-16">
      <div className="max-w-3xl border-b border-[#333] pb-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#9a9a9a]">Fit Consultation</p>
        <h1 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">
          Size Guide
        </h1>
        <p className="mt-4 text-sm leading-6 text-[#c0c0c0] sm:text-base sm:leading-7">
          Classified pieces are cut with an intentional, architectural silhouette. Our t-shirts and hoodies feature relaxed dropped shoulders, wide sleeves, and a structured boxy drape. We recommend taking your normal size for the intended oversized look, or sizing down for a closer classic fit.
        </p>
      </div>

      {/* Controls: Unit Toggle & Category Tabs */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#262626] pb-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCategory("tees")}
            className={`min-h-9 px-4 text-xs font-semibold uppercase tracking-wider transition-colors ${
              category === "tees" ? "bg-white text-black" : "border border-[#333] text-[#aaa] hover:text-white"
            }`}
          >
            Oversized Tees
          </button>
          <button
            type="button"
            onClick={() => setCategory("hoodies")}
            className={`min-h-9 px-4 text-xs font-semibold uppercase tracking-wider transition-colors ${
              category === "hoodies" ? "bg-white text-black" : "border border-[#333] text-[#aaa] hover:text-white"
            }`}
          >
            Hoodies
          </button>
          <button
            type="button"
            onClick={() => setCategory("cargo")}
            className={`min-h-9 px-4 text-xs font-semibold uppercase tracking-wider transition-colors ${
              category === "cargo" ? "bg-white text-black" : "border border-[#333] text-[#aaa] hover:text-white"
            }`}
          >
            Utility Cargo
          </button>
        </div>

        {/* Unit switch */}
        <div className="flex items-center gap-1 border border-[#333] p-1 text-xs uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setUnit("in")}
            className={`px-3 py-1 font-semibold ${unit === "in" ? "bg-white text-black" : "text-[#888] hover:text-white"}`}
          >
            Inches
          </button>
          <button
            type="button"
            onClick={() => setUnit("cm")}
            className={`px-3 py-1 font-semibold ${unit === "cm" ? "bg-white text-black" : "text-[#888] hover:text-white"}`}
          >
            Centimeters
          </button>
        </div>
      </div>

      {/* Tables */}
      <div className="mt-6 overflow-x-auto">
        {category === "tees" && (
          <table className="w-full min-w-[500px] text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#333] text-[10px] uppercase tracking-wider text-[#777]">
                <th className="py-3 pr-4">Size</th>
                <th className="py-3 px-4">Chest (Pit to Pit)</th>
                <th className="py-3 px-4">Body Length</th>
                <th className="py-3 px-4">Shoulder Width</th>
                <th className="py-3 pl-4">Sleeve Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e1e] font-mono text-[#ddd]">
              <tr>
                <td className="py-3.5 pr-4 font-bold text-white">S (Small)</td>
                <td className="py-3.5 px-4">{round(22)} {unit}</td>
                <td className="py-3.5 px-4">{round(28.5)} {unit}</td>
                <td className="py-3.5 px-4">{round(21)} {unit}</td>
                <td className="py-3.5 pl-4">{round(9.5)} {unit}</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-white">M (Medium)</td>
                <td className="py-3.5 px-4">{round(23.5)} {unit}</td>
                <td className="py-3.5 px-4">{round(29.5)} {unit}</td>
                <td className="py-3.5 px-4">{round(22)} {unit}</td>
                <td className="py-3.5 pl-4">{round(10)} {unit}</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-white">L (Large)</td>
                <td className="py-3.5 px-4">{round(25)} {unit}</td>
                <td className="py-3.5 px-4">{round(30.5)} {unit}</td>
                <td className="py-3.5 px-4">{round(23)} {unit}</td>
                <td className="py-3.5 pl-4">{round(10.5)} {unit}</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-white">XL (Extra Large)</td>
                <td className="py-3.5 px-4">{round(26.5)} {unit}</td>
                <td className="py-3.5 px-4">{round(31.5)} {unit}</td>
                <td className="py-3.5 px-4">{round(24)} {unit}</td>
                <td className="py-3.5 pl-4">{round(11)} {unit}</td>
              </tr>
            </tbody>
          </table>
        )}

        {category === "hoodies" && (
          <table className="w-full min-w-[500px] text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#333] text-[10px] uppercase tracking-wider text-[#777]">
                <th className="py-3 pr-4">Size</th>
                <th className="py-3 px-4">Chest Width</th>
                <th className="py-3 px-4">Body Length</th>
                <th className="py-3 px-4">Shoulder Width</th>
                <th className="py-3 pl-4">Sleeve Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e1e] font-mono text-[#ddd]">
              <tr>
                <td className="py-3.5 pr-4 font-bold text-white">S (Small)</td>
                <td className="py-3.5 px-4">{round(24)} {unit}</td>
                <td className="py-3.5 px-4">{round(27.5)} {unit}</td>
                <td className="py-3.5 px-4">{round(22.5)} {unit}</td>
                <td className="py-3.5 pl-4">{round(24.5)} {unit}</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-white">M (Medium)</td>
                <td className="py-3.5 px-4">{round(25.5)} {unit}</td>
                <td className="py-3.5 px-4">{round(28.5)} {unit}</td>
                <td className="py-3.5 px-4">{round(23.5)} {unit}</td>
                <td className="py-3.5 pl-4">{round(25)} {unit}</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-white">L (Large)</td>
                <td className="py-3.5 px-4">{round(27)} {unit}</td>
                <td className="py-3.5 px-4">{round(29.5)} {unit}</td>
                <td className="py-3.5 px-4">{round(24.5)} {unit}</td>
                <td className="py-3.5 pl-4">{round(25.5)} {unit}</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-white">XL (Extra Large)</td>
                <td className="py-3.5 px-4">{round(28.5)} {unit}</td>
                <td className="py-3.5 px-4">{round(30.5)} {unit}</td>
                <td className="py-3.5 px-4">{round(25.5)} {unit}</td>
                <td className="py-3.5 pl-4">{round(26)} {unit}</td>
              </tr>
            </tbody>
          </table>
        )}

        {category === "cargo" && (
          <table className="w-full min-w-[500px] text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#333] text-[10px] uppercase tracking-wider text-[#777]">
                <th className="py-3 pr-4">Size</th>
                <th className="py-3 px-4">Waist (Relaxed/Stretched)</th>
                <th className="py-3 px-4">Inseam</th>
                <th className="py-3 px-4">Thigh</th>
                <th className="py-3 pl-4">Leg Opening</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e1e] font-mono text-[#ddd]">
              <tr>
                <td className="py-3.5 pr-4 font-bold text-white">S (28–30)</td>
                <td className="py-3.5 px-4">{round(28)}–{round(32)} {unit}</td>
                <td className="py-3.5 px-4">{round(30)} {unit}</td>
                <td className="py-3.5 px-4">{round(13.5)} {unit}</td>
                <td className="py-3.5 pl-4">{round(9.5)} {unit}</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-white">M (31–33)</td>
                <td className="py-3.5 px-4">{round(30)}–{round(34)} {unit}</td>
                <td className="py-3.5 px-4">{round(31)} {unit}</td>
                <td className="py-3.5 px-4">{round(14)} {unit}</td>
                <td className="py-3.5 pl-4">{round(10)} {unit}</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-white">L (34–36)</td>
                <td className="py-3.5 px-4">{round(33)}–{round(37)} {unit}</td>
                <td className="py-3.5 px-4">{round(31.5)} {unit}</td>
                <td className="py-3.5 px-4">{round(14.5)} {unit}</td>
                <td className="py-3.5 pl-4">{round(10.5)} {unit}</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-white">XL (36–38)</td>
                <td className="py-3.5 px-4">{round(35)}–{round(40)} {unit}</td>
                <td className="py-3.5 px-4">{round(32)} {unit}</td>
                <td className="py-3.5 px-4">{round(15)} {unit}</td>
                <td className="py-3.5 pl-4">{round(11)} {unit}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {/* Model Stats Reference */}
      <div className="mt-12 border-t border-[#262626] pt-10">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
          Campaign Model Measurements
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="border border-[#262626] bg-[#111] p-4 text-xs leading-6 text-[#aaa]">
            <p className="font-semibold text-white">Male Model (sitting left in campaign):</p>
            <p>Height: 6&apos;1&quot; (185 cm) · Weight: 74 kg</p>
            <p>Wearing: <span className="text-white">Signature Hoodie Size L</span> · <span className="text-white">Utility Cargo Size L</span></p>
          </div>
          <div className="border border-[#262626] bg-[#111] p-4 text-xs leading-6 text-[#aaa]">
            <p className="font-semibold text-white">Female Model (standing right in campaign):</p>
            <p>Height: 5&apos;8&quot; (172 cm) · Weight: 54 kg</p>
            <p>Wearing: <span className="text-white">Core Oversized Tee Size M</span> · <span className="text-white">Utility Cargo Size S</span></p>
          </div>
        </div>
      </div>

      {/* Measuring Instructions */}
      <div className="mt-10 border-t border-[#262626] pt-10">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
          How to Measure Your Garment
        </h3>
        <ul className="mt-4 grid gap-3 text-xs leading-6 text-[#999] sm:grid-cols-3">
          <li className="border border-[#222] p-4">
            <strong className="text-white">Chest:</strong> Lay your favorite tee flat. Measure from armpit seam to armpit seam straight across.
          </li>
          <li className="border border-[#222] p-4">
            <strong className="text-white">Length:</strong> Measure from the highest point of the shoulder collar seam down to the bottom hem.
          </li>
          <li className="border border-[#222] p-4">
            <strong className="text-white">Shoulder:</strong> Measure straight across the back from shoulder seam to shoulder seam.
          </li>
        </ul>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SHIPPING & RETURNS PAGE
// ---------------------------------------------------------------------------
export function ShippingReturnsPage() {
  return (
    <div className="store-container pb-20 pt-10 sm:pb-28 sm:pt-16">
      <div className="max-w-3xl border-b border-[#333] pb-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#9a9a9a]">Order Logistics</p>
        <h1 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">
          Shipping &amp; Returns
        </h1>
        <p className="mt-4 text-sm leading-6 text-[#c0c0c0] sm:text-base sm:leading-7">
          Every Classified piece is dispatched in bespoke rigid packaging from our central warehouse in Dhaka. We partner with express couriers to deliver your pieces safely and quickly.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Domestic Shipping */}
        <div className="border border-[#262626] bg-[#0d0d0d] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <StoreIcon name="box" size={22} className="text-[#0B6B57]" />
            <h2 className="text-base font-semibold uppercase tracking-wide text-white">
              Domestic Delivery (Bangladesh)
            </h2>
          </div>

          <div className="mt-6 space-y-6 text-xs text-[#aaa]">
            <div className="border-b border-[#222] pb-4">
              <div className="flex justify-between font-semibold text-white">
                <span>Inside Dhaka Metro</span>
                <span className="font-mono text-[#0B6B57]">24–48 Hours · ৳100</span>
              </div>
              <p className="mt-1.5 leading-5">
                Hand-delivered via direct express logistics in rigid outer transport cartons. Free on orders above ৳5,000.
              </p>
            </div>

            <div className="border-b border-[#222] pb-4">
              <div className="flex justify-between font-semibold text-white">
                <span>Nationwide (Outside Dhaka)</span>
                <span className="font-mono text-[#0B6B57]">2–4 Business Days · ৳150</span>
              </div>
              <p className="mt-1.5 leading-5">
                Full coverage across Chittagong, Sylhet, Rajshahi, Khulna, and all district towns via verified courier partners with live SMS tracking.
              </p>
            </div>

            <div>
              <p className="font-semibold text-white">Payment Methods Supported:</p>
              <p className="mt-1 leading-5">
                Cash on Delivery (COD), bKash, Nagad, Visa, Mastercard, and American Express.
              </p>
            </div>
          </div>
        </div>

        {/* International Shipping */}
        <div className="border border-[#262626] bg-[#0d0d0d] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <StoreIcon name="arrow-up-right" size={22} className="text-[#0B6B57]" />
            <h2 className="text-base font-semibold uppercase tracking-wide text-white">
              International Delivery
            </h2>
          </div>

          <div className="mt-6 space-y-6 text-xs text-[#aaa]">
            <div className="border-b border-[#222] pb-4">
              <div className="flex justify-between font-semibold text-white">
                <span>Global Express (DHL / FedEx)</span>
                <span className="font-mono text-[#0B6B57]">3–7 Business Days</span>
              </div>
              <p className="mt-1.5 leading-5">
                Fully insured air express to North America, UK, Europe, Middle East, and Asia Pacific. Real-time end-to-end tracking provided at dispatch.
              </p>
            </div>

            <div>
              <p className="font-semibold text-white">Customs &amp; Duties:</p>
              <p className="mt-1 leading-5">
                International shipments may be subject to local import taxes and VAT upon arrival depending on your country&apos;s customs threshold.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Exchange Policy */}
      <div className="mt-12 border border-[#262626] bg-[#0d0d0d] p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <StoreIcon name="shield" size={22} className="text-[#0B6B57]" />
          <h2 className="text-base font-semibold uppercase tracking-wide text-white">
            7-Day Hassle-Free Exchange Policy
          </h2>
        </div>

        <div className="mt-6 grid gap-6 text-xs text-[#aaa] sm:grid-cols-3">
          <div>
            <h3 className="font-semibold uppercase tracking-wider text-white">1. Eligibility</h3>
            <p className="mt-2 leading-6">
              Garments must be unworn, unwashed, unaltered, and with all original tags, tissue paper, and presentation box intact.
            </p>
          </div>
          <div>
            <h3 className="font-semibold uppercase tracking-wider text-white">2. Exchange Initiation</h3>
            <p className="mt-2 leading-6">
              Reach out to our concierge within 7 days of receiving your package with your order number and desired replacement size.
            </p>
          </div>
          <div>
            <h3 className="font-semibold uppercase tracking-wider text-white">3. Doorstep Swap</h3>
            <p className="mt-2 leading-6">
              For Dhaka metro orders, our delivery partner handles doorstep swap. For outside Dhaka, reverse pickup is scheduled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FAQS PAGE
// ---------------------------------------------------------------------------
type FaqCategory = "drops" | "garments" | "shipping" | "packaging";

export function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("drops");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: Record<FaqCategory, { q: string; a: string }[]> = {
    drops: [
      {
        q: "How do Classified. drops work?",
        a: "Classified operates on small-batch scheduled releases. Each drop is limited to a finite number of pieces. Once an edition sells out, the exact same graphic and cut will not be reprinted, preserving archive value.",
      },
      {
        q: "How do I secure an allocation before the public?",
        a: "Members of the Classified Inner Circle receive early drop access codes 15 minutes before the public release time. Sign up on our Membership page to get on the priority list.",
      },
      {
        q: "Will sold out pieces ever restock?",
        a: "Core pieces (like the Core Oversized Tee) may receive seasonal colorway iterations, but numbered archive graphics and collaborative drops are strictly single-run releases.",
      },
    ],
    garments: [
      {
        q: "What fabric weights (GSM) are used?",
        a: "We use ultra-heavyweight fabrics: our graphic t-shirts are crafted from 280 GSM compact combed cotton jersey, and our signature hoodies are knitted from 460 GSM French terry fleece with high structural drape.",
      },
      {
        q: "How should I wash and care for my garments?",
        a: "Machine wash cold inside-out on a gentle cycle (maximum 30°C) with like colors. Avoid bleach and tumble drying high. Hang or lay flat to dry in shade to maintain the structural rib collar and print longevity.",
      },
      {
        q: "What printing technique is used on the graphics?",
        a: "We utilize high-density discharge screen printing and premium soft-hand inks. The graphic becomes part of the cotton fibers rather than sitting as a stiff plastic layer on top, remaining breathable and crack-resistant.",
      },
    ],
    shipping: [
      {
        q: "How long does shipping take inside Dhaka and nationwide?",
        a: "Dhaka deliveries arrive within 24 to 48 hours. Nationwide deliveries across Bangladesh take 2 to 4 business days via tracked express couriers. International express via DHL takes 3 to 7 business days.",
      },
      {
        q: "Can I pay using Cash on Delivery (COD)?",
        a: "Yes. Cash on Delivery is available across all 64 districts in Bangladesh. We also accept bKash, Nagad, Visa, Mastercard, and American Express.",
      },
      {
        q: "What if the size doesn't fit me?",
        a: "We offer a 7-day hassle-free exchange window. Simply contact our support team, and we will swap your unworn piece for your preferred size.",
      },
    ],
    packaging: [
      {
        q: "What is included with my unboxing?",
        a: "Every order arrives in our custom matte black magnetic presentation box, wrapped in 70×90cm bespoke printed tissue paper, with thick hangtags, metal eyelets, and an archival thank-you art print.",
      },
      {
        q: "Are the acrylic streetwear tags included?",
        a: "Limited-edition acrylic charms and keychains are included with select launch bundles and are also available as standalone accessory pieces in our shop.",
      },
    ],
  };

  const currentFaqs = faqs[activeCategory];

  return (
    <div className="store-container pb-20 pt-10 sm:pb-28 sm:pt-16">
      <div className="max-w-3xl border-b border-[#333] pb-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#9a9a9a]">Help &amp; Answers</p>
        <h1 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-sm leading-6 text-[#c0c0c0] sm:text-base sm:leading-7">
          Everything you need to know about Classified drops, fabric engineering, sizing, shipping, and packaging.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="mt-8 flex flex-wrap gap-2 border-b border-[#262626] pb-4">
        {[
          { id: "drops", label: "Drops & Releases" },
          { id: "garments", label: "Garment & Fabric" },
          { id: "shipping", label: "Shipping & Orders" },
          { id: "packaging", label: "Packaging & Care" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveCategory(tab.id as FaqCategory);
              setOpenIndex(0);
            }}
            className={`min-h-9 px-4 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeCategory === tab.id
                ? "bg-white text-black"
                : "border border-[#333] text-[#aaa] hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="mt-6 max-w-3xl divide-y divide-[#262626]">
        {currentFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.q} className="py-4">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between text-left text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:text-[#0B6B57]"
              >
                <span>{faq.q}</span>
                <StoreIcon
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={16}
                  className="shrink-0 text-[#888]"
                />
              </button>
              {isOpen && (
                <p className="mt-3 text-xs leading-6 text-[#aaa] sm:text-sm sm:leading-7">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Still need help */}
      <div className="mt-16 border-t border-[#262626] pt-8">
        <p className="text-xs text-[#888]">
          Have a specific question not covered here? Reach out to our concierge directly via our{" "}
          <Link href="/contact/" className="text-white underline hover:text-[#0B6B57]">
            Contact Page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CONTACT PAGE
// ---------------------------------------------------------------------------
export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState("Order Inquiry");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="store-container grid gap-12 pb-20 pt-10 sm:pb-28 sm:pt-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#9a9a9a]">Direct Concierge</p>
        <h1 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">
          Contact
        </h1>
        <p className="mt-4 text-sm leading-6 text-[#c0c0c0] sm:text-base sm:leading-7">
          Our studio and concierge team in Dhaka are ready to assist with sizing consultations, order inquiries, press, and private collection allocations.
        </p>

        {/* Studio Info Details */}
        <div className="mt-10 space-y-6 text-xs text-[#aaa]">
          <div className="flex items-start gap-3">
            <StoreIcon name="map-pin" size={18} className="mt-0.5 text-[#0B6B57]" />
            <div>
              <p className="font-semibold uppercase tracking-wider text-white">Classified Studio &amp; HQ</p>
              <p className="mt-1 text-[#888]">Gulshan Avenue, Dhaka 1212, Bangladesh</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <StoreIcon name="mail" size={18} className="mt-0.5 text-[#0B6B57]" />
            <div>
              <p className="font-semibold uppercase tracking-wider text-white">Concierge &amp; Inquiries</p>
              <p className="mt-1 font-mono text-[#ddd]">concierge@classified.style</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <StoreIcon name="clock" size={18} className="mt-0.5 text-[#0B6B57]" />
            <div>
              <p className="font-semibold uppercase tracking-wider text-white">Studio Hours</p>
              <p className="mt-1 text-[#888]">Saturday – Thursday · 10:00 AM – 8:00 PM BST</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 border-t border-[#262626] pt-6">
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#777]">Follow the Movement</p>
          <div className="mt-3 flex gap-4 text-white/80">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="Instagram">
              <StoreIcon name="instagram" size={18} />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="TikTok">
              <StoreIcon name="tiktok" size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="YouTube">
              <StoreIcon name="youtube" size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="border border-[#262626] bg-[#0c0c0c] p-6 sm:p-8">
        <h2 className="text-base font-semibold uppercase tracking-wider text-white">
          Send a Message
        </h2>

        {submitted ? (
          <div className="mt-6 border border-[#0B6B57]/40 bg-[#0B6B57]/10 p-6 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#0B6B57] text-white">
              <StoreIcon name="check" size={20} />
            </div>
            <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-white">
              Message Received
            </h3>
            <p className="mt-2 text-xs text-[#bbb]">
              Thank you for connecting with Classified. Our concierge team will respond to your inquiry within 24 business hours.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="store-button-outline mt-6 text-xs"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-[9px] uppercase tracking-[0.15em] text-[#aaa]">Inquiry Subject</span>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1.5 block min-h-11 w-full border border-[#333] bg-[#141414] px-3 text-xs uppercase tracking-wider text-white outline-none focus:border-white"
              >
                <option value="Order Inquiry">Order Inquiry &amp; Delivery</option>
                <option value="Sizing Consultation">Sizing Consultation</option>
                <option value="Drop Allocation">Private Drop Allocation</option>
                <option value="Press & Wholesale">Press &amp; Editorial</option>
                <option value="General">General Inquiry</option>
              </select>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#aaa]">Full Name</span>
                <input
                  type="text"
                  required
                  placeholder="Rashid Shahriyar"
                  className="mt-1.5 block min-h-11 w-full border border-[#333] bg-[#141414] px-3 text-xs text-white placeholder:text-[#555] outline-none focus:border-white"
                />
              </label>
              <label className="block">
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#aaa]">Email Address</span>
                <input
                  type="email"
                  required
                  placeholder="rashid@example.com"
                  className="mt-1.5 block min-h-11 w-full border border-[#333] bg-[#141414] px-3 text-xs text-white placeholder:text-[#555] outline-none focus:border-white"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-[9px] uppercase tracking-[0.15em] text-[#aaa]">Phone Number (Optional)</span>
              <input
                type="tel"
                placeholder="+880 1700 000000"
                className="mt-1.5 block min-h-11 w-full border border-[#333] bg-[#141414] px-3 text-xs text-white placeholder:text-[#555] outline-none focus:border-white"
              />
            </label>

            <label className="block">
              <span className="text-[9px] uppercase tracking-[0.15em] text-[#aaa]">Message</span>
              <textarea
                rows={5}
                required
                placeholder="How can we assist you with Classified.?"
                className="mt-1.5 block w-full resize-y border border-[#333] bg-[#141414] px-3 py-3 text-xs text-white placeholder:text-[#555] outline-none focus:border-white"
              />
            </label>

            <button type="submit" className="store-button-primary mt-2 min-h-11 w-full justify-center">
              Submit Inquiry
              <StoreIcon name="arrow-right" size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// LEGAL / PRIVACY & TERMS
// ---------------------------------------------------------------------------
export function LegalPage({ type }: { type: "privacy" | "terms" }) {
  const isPrivacy = type === "privacy";

  return (
    <div className="store-container pb-20 pt-10 sm:pb-28 sm:pt-16">
      <div className="max-w-3xl border-b border-[#333] pb-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#9a9a9a]">Legal Governance</p>
        <h1 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">
          {isPrivacy ? "Privacy Policy" : "Terms & Conditions"}
        </h1>
        <p className="mt-4 text-xs font-mono text-[#888]">
          Last updated: November 2026 · Classified. Fashion House Ltd.
        </p>
      </div>

      <div className="mt-10 max-w-3xl space-y-8 text-xs leading-7 text-[#aaa] sm:text-sm sm:leading-8">
        {isPrivacy ? (
          <>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
                1. Information We Collect
              </h2>
              <p className="mt-2">
                Classified collects personal information you provide when placing an order, subscribing to our Inner Circle, or contacting our concierge. This includes your name, shipping address, email address, phone number, and payment preferences.
              </p>
            </section>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
                2. How We Use Your Data
              </h2>
              <p className="mt-2">
                Your data is exclusively utilized to process and fulfill garment allocations, arrange doorstep delivery across Bangladesh and internationally, send drop notification codes, and provide tailored concierge support. We never sell your personal information.
              </p>
            </section>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
                3. Payment Security
              </h2>
              <p className="mt-2">
                All digital transactions are encrypted via PCI-DSS compliant payment gateways. Card numbers and financial credentials are processed through tokenized banking infrastructure and are never stored on Classified servers.
              </p>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
                1. Drop Allocations &amp; Orders
              </h2>
              <p className="mt-2">
                All orders are subject to acceptance and availability. Due to small-batch drop mechanics, items in your cart are not reserved until checkout completion and payment authorization. Classified reserves the right to cancel suspected bot or bulk reseller orders.
              </p>
            </section>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
                2. Pricing &amp; Currency
              </h2>
              <p className="mt-2">
                All prices on Classified are listed in Bangladeshi Taka (BDT) and include standard value-added taxes where applicable. International orders are billed in equivalent currency at prevailing spot exchange rates.
              </p>
            </section>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
                3. Intellectual Property
              </h2>
              <p className="mt-2">
                The Classified brand name, C logo emblem, &quot;NOT FOR EVERYONE&quot; trademark, garment cuts, and visual lookbooks are the exclusive intellectual property of Classified. Unauthorized reproduction or resale infringement will be legally pursued.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
