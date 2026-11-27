import Image from "next/image";

const manifestoImage = "/images/manifesto-statue.webp";

export function BrandManifesto() {
  return (
    <section id="manifesto" className="store-manifesto relative isolate overflow-hidden border-y border-[#292929]">
      <Image
        src={manifestoImage}
        alt="Classified. statue artwork with sunglasses in dramatic editorial lighting"
        fill
        unoptimized
        sizes="100vw"
        className="-z-20 object-cover object-[center_center]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#080808]/75" />
      <div className="mx-auto flex min-h-[220px] max-w-[1600px] flex-col items-center justify-center px-5 py-12 text-center sm:min-h-[260px] sm:py-16">
        <span aria-hidden="true" className="mb-4 h-px w-8 bg-[#a3a3a3]" />
        <blockquote className="font-serif text-[clamp(1.35rem,3.8vw,2.4rem)] italic leading-tight text-[#f5f5f5]">
          “More than clothing — it’s a mindset.”
        </blockquote>
        <p className="mt-4 max-w-2xl text-[8px] font-medium uppercase leading-5 tracking-[0.2em] text-[#d0d0d0] sm:text-[9px] sm:tracking-[0.28em]">
          Classified. exists for the select few — a community that values individuality,
          <br className="hidden sm:block" /> discipline, and culture.
        </p>
        <span aria-hidden="true" className="mt-5 h-px w-8 bg-[#a3a3a3]" />
      </div>
    </section>
  );
}
