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
      className={`inline-flex items-center justify-center gap-2 ${binggoWood.className} ${className ?? ""}`}
    >
      <BrandMark className="h-[1.05em] w-auto shrink-0 fill-current" />
      <span className="text-inherit">Classified.</span>
    </span>
  );
}
