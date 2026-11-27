import localFont from "next/font/local";
import { BrandMark } from "@/components/brand-mark";

const binggoWood = localFont({
  src: "../../public/fonts/binggo-wood.woff2",
  display: "swap",
});

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-[0.25em] ${binggoWood.className} ${className ?? ""}`}
    >
      <BrandMark className="h-[0.62em] w-auto shrink-0 -translate-y-[0.05em]" />
      <span className="leading-none text-inherit">Classified.</span>
    </span>
  );
}
