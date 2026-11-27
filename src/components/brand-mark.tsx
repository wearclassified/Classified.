import Image from "next/image";

type BrandMarkProps = {
  className?: string;
  title?: string;
};

export function BrandMark({ className, title = "Classified" }: BrandMarkProps) {
  return (
    <Image
      src="/C_mark.svg"
      width={34}
      height={67}
      alt={title}
      className={className}
    />
  );
}
