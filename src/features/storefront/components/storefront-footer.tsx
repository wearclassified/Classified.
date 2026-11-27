import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Shop all", href: "/shop/" },
      { label: "Categories", href: "/shop/#categories" },
      { label: "Our story", href: "/about/" },
      { label: "Size guide", href: "/size-guide/" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/login/" },
      { label: "Membership", href: "/membership/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  {
    title: "Help & policies",
    links: [
      { label: "FAQs", href: "/faq/" },
      { label: "Shipping & returns", href: "/shipping-returns/" },
      { label: "Privacy", href: "/privacy/" },
      { label: "Terms", href: "/terms/" },
    ],
  },
];

export function StorefrontFooter({ hasMobileBottomNav = true }: { hasMobileBottomNav?: boolean }) {
  return (
    <footer
      className={`border-t border-[#292929] bg-[#080808] ${
        hasMobileBottomNav ? "pb-[calc(56px+env(safe-area-inset-bottom))] lg:pb-0" : "pb-0"
      }`}
    >
      <div className="store-container grid gap-8 py-9 sm:grid-cols-2 sm:gap-6 sm:py-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="Classified home" className="inline-flex w-fit items-center leading-none">
            <BrandLogo className="text-2xl text-[#f5f5f5]" />
          </Link>
          <p className="mt-3 max-w-xs text-xs leading-5 text-[#929292]">
            Independent style. Intentional design. Built for those who move different.
          </p>
        </div>
        {footerLinks.map((group) => (
          <div key={group.title}>
            <h2 className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#ededed]">
              {group.title}
            </h2>
            <ul className="mt-3 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-8 items-center text-xs text-[#9b9b9b] transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[#292929]">
        <div className="store-container flex flex-col gap-2 py-4 text-[9px] uppercase tracking-[0.12em] text-[#777] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Classified. All rights reserved.</p>
          <nav aria-label="Legal links" className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy/" className="hover:text-white">Privacy</Link>
            <Link href="/terms/" className="hover:text-white">Terms</Link>
          </nav>
          <p>Preview experience · Prices shown in BDT</p>
        </div>
      </div>
    </footer>
  );
}
