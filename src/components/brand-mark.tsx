type BrandMarkProps = {
  className?: string;
  title?: string;
};

export function BrandMark({ className, title = "Classified" }: BrandMarkProps) {
  return (
    <svg
      width="1024"
      height="1000"
      viewBox="0 0 1024 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
      focusable="false"
    >
      {/* Left Semi-Circle (Classified Forest Green) */}
      <path
        d="M512 0C235.858 0 12 223.858 12 500C12 776.142 235.858 1000 512 1000V750C374.477 750 262 637.523 262 500C262 362.477 374.477 250 512 250V0Z"
        className="logo-green"
      />
      {/* Right Semi-Circle (Bone White) */}
      <path
        d="M512 250C649.523 250 762 362.477 762 500C762 637.523 649.523 750 512 750V250Z"
        className="logo-white"
      />
    </svg>
  );
}
