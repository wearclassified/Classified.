"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { StoreIcon } from "./store-icon";

export function MembershipSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="membership" className="store-container py-10 sm:py-14">
      <div className="rounded-xl border border-[#333] bg-[#101010] px-5 py-7 sm:px-8 sm:py-9 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-12">
        <div className="max-w-xl">
          <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#aaa]">Classified. membership</p>
          <h2 className="mt-3 text-xl font-semibold uppercase tracking-[0.1em] text-[#f5f5f5] sm:text-2xl">
            Get on the list.
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#a2a2a2]">
            Be first to hear about new drops, limited releases, and what is next.
          </p>
        </div>
        <div className="mt-6 w-full lg:mt-0 lg:max-w-[500px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor="membership-email" className="sr-only">
              Email address
            </label>
            <input
              id="membership-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Your email address"
              onChange={() => setSubmitted(false)}
              className="min-h-12 min-w-0 flex-1 rounded-md border border-[#444] bg-[#080808] px-4 text-sm text-white placeholder:text-[#777] focus:border-white focus:outline-none"
            />
            <button type="submit" className="store-button-primary min-h-12 justify-center rounded-md">
              Join the list
              <StoreIcon name="arrow-right" size={17} />
            </button>
          </form>
          <p aria-live="polite" className="mt-3 min-h-4 text-[10px] leading-4 text-[#929292]">
            {submitted
              ? "Preview only — newsletter signups are not connected or saved."
              : "This preview does not save or send email addresses."}
          </p>
          <Link
            href="/login/"
            className="mt-3 inline-flex min-h-11 items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#d0d0d0] hover:text-white"
          >
            Already a member? Sign in
            <StoreIcon name="arrow-right" size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
