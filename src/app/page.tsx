import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export const metadata: Metadata = {
  title: "Find your next favorite thing",
  description:
    "Discover good finds, manage your listings, and keep your favorites close with Classified.",
};

const highlights = [
  {
    number: "01",
    title: "Discover",
    description: "Find things worth a closer look.",
  },
  {
    number: "02",
    title: "List",
    description: "Keep your listings in one place.",
  },
  {
    number: "03",
    title: "Save",
    description: "Come back to your saved finds and fit picks.",
  },
];

export default function HomePage() {
  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#f7f8f6] text-zinc-900 dark:bg-[#080b0a] dark:text-zinc-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 -top-40 h-[28rem] w-[28rem] rounded-full bg-[#dcece5] blur-3xl dark:bg-[#06392f]/30"
      />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <Link href="/" aria-label="Classified home" className="rounded-sm">
          <BrandLogo className="text-xl tracking-tight text-zinc-900 dark:text-white sm:text-2xl" />
        </Link>
        <Link
          href="/login/"
          className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-black/5 hover:text-[#06392f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06392f]/40 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white"
        >
          Sign in
        </Link>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">
        <section className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#06392f]/10 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#06392f] dark:border-white/10 dark:bg-white/5 dark:text-[#a8d7c8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0b8d72]" />
            Discover · List · Save
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] text-zinc-950 dark:text-white sm:text-6xl lg:text-7xl">
            Good finds
            <br />
            start here.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg sm:leading-8">
            A simple place to discover things you love, manage your listings, and keep your
            favorite finds close.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/login/"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#06392f] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#06392f]/15 transition-transform hover:-translate-y-0.5 hover:bg-[#085343] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06392f]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f8f6] dark:focus-visible:ring-offset-[#080b0a]"
            >
              Get started
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
              >
                <path
                  d="M4.5 10h11m0 0-4.5-4.5M15.5 10 11 14.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                />
              </svg>
            </Link>
            <span className="text-sm text-zinc-500 dark:text-zinc-500">
              Sign in or create an account
            </span>
          </div>
        </section>

        <section
          aria-label="What you can do with Classified"
          className="mt-16 grid max-w-4xl grid-cols-1 gap-3 border-t border-zinc-200/80 pt-6 dark:border-white/10 sm:grid-cols-3 sm:gap-6"
        >
          {highlights.map((highlight) => (
            <article key={highlight.number} className="py-2 sm:py-3">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#0b8d72]">
                {highlight.number}
              </p>
              <h2 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {highlight.title}
              </h2>
              <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {highlight.description}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
