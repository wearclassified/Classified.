import type { ReactNode } from "react";

export type StoreIconName =
  | "arrow-right"
  | "arrow-up-right"
  | "bag"
  | "box"
  | "check"
  | "chevron-down"
  | "chevron-up"
  | "clock"
  | "close"
  | "grid"
  | "heart"
  | "home"
  | "lock"
  | "mail"
  | "map-pin"
  | "menu"
  | "minus"
  | "phone"
  | "plus"
  | "search"
  | "shield"
  | "shirt"
  | "sparkles"
  | "tag"
  | "user"
  | "instagram"
  | "tiktok"
  | "youtube";

const iconContent: Record<StoreIconName, ReactNode> = {
  "arrow-right": <path d="M4.5 12h15m0 0-6-6m6 6-6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M7 7h10v10" />,
  bag: (
    <>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </>
  ),
  box: (
    <>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-up": <path d="m18 15-6-6-6 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
    </>
  ),
  heart: <path d="M20.8 8.8c0 5.3-8.8 10.1-8.8 10.1S3.2 14.1 3.2 8.8A4.3 4.3 0 0 1 12 7.1a4.3 4.3 0 0 1 8.8 1.7Z" />,
  home: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z" />,
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="1.5" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3m-4 4v3" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  minus: <path d="M5 12h14" />,
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
  ),
  plus: <path d="M12 5v14m-7-7h14" />,
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
  shirt: <path d="m8 4 4 2 4-2 5 3-2 5-3-1v9H8v-9l-3 1-2-5 5-3Z" />,
  sparkles: (
    <>
      <path d="m12 3 1.91 5.09L19 10l-5.09 1.91L12 17l-1.91-5.09L5 10l5.09-1.91L12 3Z" />
      <path d="M5 3v4M3 5h4" />
    </>
  ),
  tag: (
    <path d="M12 2H2v10l9.29 9.29a2.41 2.41 0 0 0 3.42 0l7.29-7.29a2.41 2.41 0 0 0 0-3.42L12 2ZM7 7h.01" />
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  tiktok: (
    <>
      <path d="M14 4v10.5a4.5 4.5 0 1 1-4-4.47" />
      <path d="M14 4c.5 2.8 2.5 4.4 5 4.7" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="m10 9 5 3-5 3V9Z" />
    </>
  ),
};

type StoreIconProps = {
  name: StoreIconName;
  className?: string;
  size?: number;
};

export function StoreIcon({ name, className, size = 20 }: StoreIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconContent[name]}
    </svg>
  );
}
