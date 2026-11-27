"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { StoreIcon } from "./store-icon";

type AnnouncementItem = {
  id: string;
  lead: string;
  highlight: string;
  suffix?: string;
  href: string;
};

type VisibilityPhase = "visible" | "closing" | "hidden";

const STORAGE_KEY = "classified_top_bar_hidden_until";
const HIDE_DURATION_MS = 60 * 60 * 1000; // 1 hour

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

function readHiddenUntil(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  } catch {
    return null;
  }
}

function writeHiddenUntil(timestamp: number | null) {
  if (typeof window === "undefined") return;
  try {
    if (timestamp === null) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, String(timestamp));
    }
  } catch {
    // Ignore storage quota / privacy mode restrictions
  }
}

export function TopAnnouncementBar() {
  const [phase, setPhase] = useState<VisibilityPhase>("visible");
  const [animateHeight, setAnimateHeight] = useState(false);
  const [reappearCycle, setReappearCycle] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const triggerReappear = useCallback(() => {
    writeHiddenUntil(null);
    setAnimateHeight(true);
    setReappearCycle((c) => c + 1);
    setPhase("visible");
  }, []);

  // Check persisted 1-hour dismissal on mount without animating initial snap-hide
  useEffect(() => {
    const hiddenUntil = readHiddenUntil();
    if (!hiddenUntil) return;

    const remaining = hiddenUntil - Date.now();
    if (remaining > 0) {
      setAnimateHeight(false);
      setPhase("hidden");
    } else {
      writeHiddenUntil(null);
    }
  }, []);

  // While hidden, arm exact 1-hour timer plus visibility/focus checks so it slides down smoothly when time expires
  useEffect(() => {
    if (phase !== "hidden") return;

    const checkAndRestore = () => {
      const hiddenUntil = readHiddenUntil();
      if (!hiddenUntil || Date.now() >= hiddenUntil) {
        triggerReappear();
        return true;
      }
      return false;
    };

    const hiddenUntil = readHiddenUntil();
    const remaining = hiddenUntil ? Math.max(0, hiddenUntil - Date.now()) : HIDE_DURATION_MS;
    const timer = setTimeout(() => {
      checkAndRestore();
    }, remaining);

    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === "visible") {
        checkAndRestore();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityOrFocus);
    window.addEventListener("focus", handleVisibilityOrFocus);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      window.removeEventListener("focus", handleVisibilityOrFocus);
    };
  }, [phase, triggerReappear]);

  // Complete slide-up closing animation before transitioning to hidden state
  useEffect(() => {
    if (phase !== "closing") return;
    const timer = setTimeout(() => {
      setPhase("hidden");
    }, 450);
    return () => clearTimeout(timer);
  }, [phase]);

  // Rotate announcements cleanly every 4 seconds when visible
  useEffect(() => {
    if (phase !== "visible" || isPaused) return;

    const timer = setTimeout(() => {
      setPrevIndex(currentIndex);
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, phase]);

  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      setPrevIndex(null);
    }, 500);
    return () => clearTimeout(timer);
  }, [isTransitioning]);

  const handleClose = () => {
    if (phase !== "visible") return;
    writeHiddenUntil(Date.now() + HIDE_DURATION_MS);
    setAnimateHeight(true);
    setPhase("closing");
  };

  const active = announcements[currentIndex];
  const previous = prevIndex !== null ? announcements[prevIndex] : null;
  const isCollapsed = phase === "closing" || phase === "hidden";

  return (
    <aside
      aria-label="Store Announcements"
      aria-hidden={isCollapsed}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative z-50 w-full overflow-hidden bg-[#000000] text-white select-none selection:bg-[#03bf93] selection:text-black ${
        animateHeight
          ? "transition-[height,opacity,border-color] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          : ""
      } ${
        phase === "visible"
          ? "h-[34px] border-b border-[#222222] opacity-100"
          : "h-0 border-b-0 opacity-0 pointer-events-none"
      }`}
    >
      <div
        key={`bar-cycle-${reappearCycle}`}
        className={`relative mx-auto flex h-[34px] max-w-[1600px] items-center justify-center overflow-hidden pl-3 pr-9 text-center sm:px-12 ${
          phase === "visible" ? "top-bar-land" : "top-bar-slide-up"
        }`}
      >
        {/* Outgoing Message (Slides Downwards out of frame) */}
        {isTransitioning && previous ? (
          <div
            key={`prev-${previous.id}`}
            aria-hidden="true"
            className="announcement-out pointer-events-none absolute inset-y-0 left-3 right-9 flex items-center justify-center sm:inset-x-12"
          >
            <p className="flex items-center justify-center whitespace-nowrap text-[9.5px] font-bold uppercase tracking-[0.09em] text-white min-[390px]:text-[10px] min-[390px]:tracking-[0.14em] sm:text-[11.5px] sm:tracking-[0.2em]">
              {previous.id === "black-friday" ? (
                <>
                  <span>{previous.lead}</span>
                  <span className="mx-1.5 text-zinc-600 font-normal sm:mx-2">|</span>
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
            tabIndex={isCollapsed ? -1 : undefined}
            className="group inline-flex items-center justify-center transition-opacity hover:opacity-90"
          >
            <p className="flex items-center justify-center whitespace-nowrap text-[9.5px] font-bold uppercase tracking-[0.09em] text-white transition-colors group-hover:text-zinc-200 min-[390px]:text-[10px] min-[390px]:tracking-[0.14em] sm:text-[11.5px] sm:tracking-[0.2em]">
              {active.id === "black-friday" ? (
                <>
                  <span>{active.lead}</span>
                  <span className="mx-1.5 text-zinc-600 font-normal sm:mx-2">|</span>
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

        {/* Close Icon on Top Right */}
        <button
          type="button"
          onClick={handleClose}
          tabIndex={isCollapsed ? -1 : undefined}
          aria-label="Dismiss announcement for 1 hour"
          className="absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-white/10 hover:text-white sm:right-3"
        >
          <StoreIcon name="close" size={14} />
        </button>
      </div>
    </aside>
  );
}
