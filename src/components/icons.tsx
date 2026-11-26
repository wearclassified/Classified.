type IconProps = {
  className?: string;
};

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 2.75c-1.615 0-3.075.404-4.135 1.388C1.795 5.132 1.25 6.607 1.25 8.5v7c0 1.893.545 3.369 1.615 4.362 1.06.984 2.52 1.388 4.135 1.388h10c1.615 0 3.075-.404 4.135-1.388 1.07-.993 1.615-2.469 1.615-4.362v-7c0-1.893-.545-3.368-1.615-4.362-1.06-.984-2.52-1.388-4.135-1.388zm12.229 5.612a.75.75 0 0 0-.918-1.187l-5.547 4.287a1.25 1.25 0 0 1-1.528 0L5.689 7.175a.75.75 0 1 0-.918 1.187l5.548 4.287a2.75 2.75 0 0 0 3.362 0z"
      />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M6.5 4.5h2.5l1.5 3.5-1.25 1.25a.75.75 0 0 0-.25.65v2.4a10.21 10.21 0 0 0 4.55 4.55h2.4a.75.75 0 0 0 .65-.25l1.25-1.25 3.5 1.5v2.5a.75.75 0 0 1-.75.75A16.25 16.25 0 0 1 3.75 5.25.75.75 0 0 1 4.5 4.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 6.75h.75M8.25 9h.75M8.25 11.25h.75M10.5 6.75h.75M10.5 9h.75M10.5 11.25h.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="currentColor" aria-hidden="true">
      <path d="M26 15v-4.28a8.2 8.2 0 0 0-8-8.36 8.2 8.2 0 0 0-8 8.36V15H7v17a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V15Zm-7 10.23V28h-2v-2.86a2.4 2.4 0 1 1 2 .09M24 15H12v-4.28a6.2 6.2 0 0 1 6-6.36 6.2 6.2 0 0 1 6 6.36Z" />
    </svg>
  );
}

export function EyeOpenIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M2.5 12S6.5 4.75 12 4.75 21.5 12 21.5 12 17.5 19.25 12 19.25 2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.25 2.9l.8 1.55M12 2v1.7M16.75 2.9l-.8 1.55"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EyeClosedIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M4.25 12c1.8-2.6 4.5-3.95 7.75-3.95S17.95 9.4 19.75 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.25 16.9l.8-1.55M12 17.8v-1.7M16.75 16.9l-.8-1.55"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SunIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={true}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

export function MoonIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={true}
    >
      <path d="M12 3a6.5 6.5 0 0 0 7.92 9.26A7 7 0 1 1 12 3Z" />
    </svg>
  );
}

export function BdFlagIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 14"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <rect width="20" height="14" fill="#006A4E" />
      <circle cx="9" cy="7" r="4.2" fill="#F42A41" />
    </svg>
  );
}

export function UsFlagIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 14"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <rect width="20" height="14" fill="#B22234" />
      <path
        d="M0 1.08h20v1.08H0zm0 2.15h20v1.08H0zm0 2.15h20v1.08H0zm0 2.16h20v1.07H0zm0 2.16h20v1.07H0zm0 2.15h20v1.08H0z"
        fill="#FFFFFF"
      />
      <rect width="8.5" height="7.54" fill="#3C3B6E" />
      <circle cx="2.1" cy="1.6" r="0.55" fill="#FFFFFF" />
      <circle cx="4.25" cy="1.6" r="0.55" fill="#FFFFFF" />
      <circle cx="6.4" cy="1.6" r="0.55" fill="#FFFFFF" />
      <circle cx="3.18" cy="2.9" r="0.55" fill="#FFFFFF" />
      <circle cx="5.32" cy="2.9" r="0.55" fill="#FFFFFF" />
      <circle cx="2.1" cy="4.2" r="0.55" fill="#FFFFFF" />
      <circle cx="4.25" cy="4.2" r="0.55" fill="#FFFFFF" />
      <circle cx="6.4" cy="4.2" r="0.55" fill="#FFFFFF" />
      <circle cx="3.18" cy="5.5" r="0.55" fill="#FFFFFF" />
      <circle cx="5.32" cy="5.5" r="0.55" fill="#FFFFFF" />
      <circle cx="2.1" cy="6.8" r="0.55" fill="#FFFFFF" />
      <circle cx="4.25" cy="6.8" r="0.55" fill="#FFFFFF" />
      <circle cx="6.4" cy="6.8" r="0.55" fill="#FFFFFF" />
    </svg>
  );
}

