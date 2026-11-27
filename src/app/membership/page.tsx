"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { StorefrontPageShell } from "@/features/storefront/components/storefront-page-shell";
import { StoreIcon } from "@/features/storefront/components/store-icon";

export default function MembershipRoute() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  function handleJoin(e: FormEvent) {
    e.preventDefault();
    if (email) setJoined(true);
  }

  return (
    <StorefrontPageShell>
      <div className="store-container pb-20 pt-10 sm:pb-28 sm:pt-16">
        {/* Hero Banner */}
        <div className="relative overflow-hidden border border-[#262626] bg-[#0c0c0c] px-6 py-12 sm:px-12 sm:py-20">
          <div className="relative z-10 max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#0B6B57]">The Private Allocation</p>
            <h1 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.05em] text-[#f5f5f5]">
              CLASSIFIED.
              <br />
              INNER CIRCLE
            </h1>
            <p className="mt-6 text-sm leading-7 text-[#bbb] sm:text-base sm:leading-8">
              We produce strictly numbered drop runs. Once an archive release sells out, it will never be reprinted. Membership guarantees priority drop access, private collection previews, and collector unboxing allocation.
            </p>

            {/* Signup Form */}
            <div className="mt-8 max-w-md">
              {joined ? (
                <div className="border border-[#0B6B57]/50 bg-[#0B6B57]/10 p-5">
                  <div className="flex items-center gap-3 text-white">
                    <StoreIcon name="check" size={20} className="text-[#0B6B57]" />
                    <p className="text-xs font-semibold uppercase tracking-wider">
                      Welcome to the Inner Circle
                    </p>
                  </div>
                  <p className="mt-2 text-[11px] leading-5 text-[#aaa]">
                    Your access has been registered for <span className="font-mono text-white">{email}</span>. You will receive private drop allocation codes 15 minutes before Drop 02 goes live.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleJoin} className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your personal email"
                    className="min-h-12 flex-1 border border-[#333] bg-[#141414] px-4 text-xs text-white placeholder:text-[#666] outline-none focus:border-white"
                  />
                  <button type="submit" className="store-button-primary min-h-12 justify-center">
                    Request Access
                    <StoreIcon name="arrow-right" size={16} />
                  </button>
                </form>
              )}
              <p className="mt-3 text-[10px] uppercase tracking-wider text-[#666]">
                Guaranteed allocation · Zero spam · Unsubscribe anytime
              </p>
            </div>
          </div>

          {/* Background graphic watermark */}
          <div className="pointer-events-none absolute -bottom-16 -right-16 select-none opacity-5 sm:opacity-10">
            <span className="font-serif text-[280px] font-bold text-white">C.</span>
          </div>
        </div>

        {/* Member Privileges */}
        <div className="mt-16 border-t border-[#262626] pt-12 sm:mt-24 sm:pt-16">
          <p className="text-[9px] uppercase tracking-[0.25em] text-[#888]">Inner Circle Privileges</p>
          <h2 className="mt-3 text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
            Reserved Exclusively For Members
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-[#262626] bg-[#0d0d0d] p-6">
              <span className="font-mono text-xs text-[#0B6B57]">01 / PRIORITY</span>
              <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-white">
                15-Min Early Access
              </h3>
              <p className="mt-2 text-xs leading-6 text-[#999]">
                Private passcodes dispatched via SMS and email prior to general public release to secure your size.
              </p>
            </div>

            <div className="border border-[#262626] bg-[#0d0d0d] p-6">
              <span className="font-mono text-xs text-[#0B6B57]">02 / ARCHIVE</span>
              <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-white">
                Deadstock &amp; Vault
              </h3>
              <p className="mt-2 text-xs leading-6 text-[#999]">
                Access unreleased studio colorway samples, overstock prototypes, and retired archival graphics.
              </p>
            </div>

            <div className="border border-[#262626] bg-[#0d0d0d] p-6">
              <span className="font-mono text-xs text-[#0B6B57]">03 / ARTWORK</span>
              <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-white">
                Collector Art Cards
              </h3>
              <p className="mt-2 text-xs leading-6 text-[#999]">
                Every member unboxing includes an individually numbered 100×150mm heavy cardstock collector&apos;s art print.
              </p>
            </div>

            <div className="border border-[#262626] bg-[#0d0d0d] p-6">
              <span className="font-mono text-xs text-[#0B6B57]">04 / CONCIERGE</span>
              <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-white">
                Dedicated Concierge
              </h3>
              <p className="mt-2 text-xs leading-6 text-[#999]">
                Direct line to our studio for bespoke size consulting, doorstep swaps, and private showroom visits.
              </p>
            </div>
          </div>
        </div>

        {/* Member Packaging Showcase */}
        <div className="mt-16 border-t border-[#262626] pt-12 sm:mt-24 sm:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#888]">Collector Presentation</p>
              <h2 className="mt-3 text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
                The Member Unboxing
              </h2>
              <p className="mt-4 text-xs leading-6 text-[#aaa] sm:text-sm sm:leading-7">
                Each piece ordered by an Inner Circle member is hand-packed in our magnetic rigid presentation box with custom seal tissue and an edition certificate signed by the Dhaka studio atelier.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-[10px] font-mono uppercase text-[#0B6B57]">
                <span className="border border-[#0B6B57]/40 px-2.5 py-1">Magnetic Rigid Box</span>
                <span className="border border-[#0B6B57]/40 px-2.5 py-1">Archival Tissue Wrap</span>
                <span className="border border-[#0B6B57]/40 px-2.5 py-1">Numbered Art Print</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden border border-[#262626]">
                <Image
                  src="/images/packaging-box.webp"
                  alt="Classified Member Box"
                  fill
                  unoptimized
                  sizes="300px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden border border-[#262626]">
                <Image
                  src="/images/packaging-tags.webp"
                  alt="Classified Member Tags"
                  fill
                  unoptimized
                  sizes="300px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sign In CTA */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[#262626] pt-8">
          <div>
            <h3 className="text-lg font-bold uppercase text-white">Already Registered?</h3>
            <p className="text-xs text-[#888]">Sign in to access your saved pieces and member profile.</p>
          </div>
          <Link href="/login/" className="store-button-primary">
            Sign In to Account
            <StoreIcon name="arrow-right" size={16} />
          </Link>
        </div>
      </div>
    </StorefrontPageShell>
  );
}
