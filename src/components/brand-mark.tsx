import type { SVGProps } from "react";

type BrandMarkProps = SVGProps<SVGSVGElement> & {
  className?: string;
  title?: string;
};

export function BrandMark({
  className,
  title = "Classified",
  ...props
}: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 33.5 67"
      fill="#0B6B57"
      aria-label={title}
      role="img"
      className={className}
      {...props}
    >
      <title>{title}</title>
      <path d="M33.5 0 A33.5 33.5 0 0 0 33.5 67 L33.5 50.25 A16.75 16.75 0 0 1 33.5 16.75 Z" />
    </svg>
  );
}
