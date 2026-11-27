"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type AnnouncementItem = {
  id: string;
  lead: string;
  highlight: string;
  suffix?: string;
  href: string;
};

const announcements: AnnouncementItem[] = [
  {
    id: "black-friday",
    lead: "Black Friday Sale Is Live",
    highlight: "Flat 50% Off 🔥",
    href: "/shop/",
  },
  {
    id: "free-delivery",
    lead: "Free Delivery on Orders Over",
    highlight: "৳5,000",
    suffix: "🚚",
    href: "/faq/",
  },
];

export function TopAnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % announcements.length);

      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setPrevIndex(null);
      }, 500);

      return () => clearTimeout(timeout);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const active = announcements[currentIndex];
  const previous = prevIndex !== null ? announcements[prevIndex] : null;

  return (
    <aside
      aria-label="Store Announcements"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="top-bar-land relative z-50 h-[34px] w-full border-b border-[#222222] bg-[#000000] text-white select-none selection:bg-[#03bf93] selection:text-black"
    >
      <div className="relative mx-auto flex h-full max-w-[1600px] items-center justify-center overflow-hidden px-3 text-center">
        {/* Outgoing Message (Slides Downwards out of frame) */}
        {isTransitioning && previous ? (
          <div
            key={`prev-${previous.id}`}
            aria-hidden="true"
            className="announcement-out absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <p className="flex items-center justify-center whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.14em] text-white sm:text-[11.5px] sm:tracking-[0.2em]">
              {previous.id === "black-friday" ? (
                <>
                  <span>{previous.lead}</span>
                  <span className="mx-2 text-zinc-600 font-normal">|</span>
                  <span className="text-[#03bf93]">{previous.highlight}</span>
                </>
              ) : (
                <>
                  <span>{previous.lead}</span>
                  <span className="ml-1 text-[#03bf93]">{previous.highlight}</span>
                  {previous.suffix ? <span className="ml-1.5">{previous.suffix}</span> : null}
                </>
              )}
            </p>
          </div>
        ) : null}

        {/* Incoming / Active Message (Slides Downwards into frame) */}
        <div
          key={`curr-${active.id}`}
          className={`flex h-full w-full items-center justify-center ${
            isTransitioning ? "announcement-in" : ""
          }`}
        >
          <Link
            href={active.href}
            className="group inline-flex items-center justify-center transition-opacity hover:opacity-90"
          >
            <p className="flex items-center justify-center whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors group-hover:text-zinc-200 sm:text-[11.5px] sm:tracking-[0.2em]">
              {active.id === "black-friday" ? (
                <>
                  <span>{active.lead}</span>
                  <span className="mx-2 text-zinc-600 font-normal">|</span>
                  <span className="text-[#03bf93] transition-colors group-hover:text-[#00ffb3]">{active.highlight}</span>
                </>
              ) : (
                <>
                  <span>{active.lead}</span>
                  <span className="ml-1 text-[#03bf93] transition-colors group-hover:text-[#00ffb3]">{active.highlight}</span>
                  {active.suffix ? <span className="ml-1.5">{active.suffix}</span> : null}
                </>
              )}
            </p>
          </Link>
        </div>
      </div>
    </aside>
  );
}
