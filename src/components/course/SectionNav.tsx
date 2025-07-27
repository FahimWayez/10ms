"use client";

import { useEffect, useRef, useState } from "react";
import {
  BigNextIcon,
  BigPreviousIcon,
  NextIcon,
  PreviousIcon,
} from "../../../public/svg/commonIcons";
import Link from "next/link";

export type SectionNavItem = { href: string; label: string };

export default function SectionNav({
  items,
  className,
  scrollByPx = 320,
}: {
  items: SectionNavItem[];
  className?: string;
  scrollByPx?: number;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setAtStart(scrollLeft <= 2);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 2);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollBy = (delta: number) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className={["w-full", className].join(" ")}>
      <div className="flex items-center gap-4 py-3">
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollBy(-scrollByPx)}
          disabled={atStart}
          className={[
            "hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 shadow ring-1 ring-black/5",
            atStart ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-200",
          ].join(" ")}
        >
          <BigPreviousIcon />
        </button>

        <div
          ref={scrollerRef}
          className="flex-1 overflow-x-auto scrollbar-hide  border-b border-gray-200"
          role="tablist"
          aria-label="Section navigation"
        >
          <div className="flex items-center gap-6 min-w-max">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                role="tab"
                className="whitespace-nowrap text-[15px] text-gray-700 hover:text-gray-900"
              >
                {it.label}
              </Link>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollBy(scrollByPx)}
          disabled={atEnd}
          className={[
            "hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 shadow ring-1 ring-black/5",
            atEnd ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-200",
          ].join(" ")}
        >
          <BigNextIcon />
        </button>
      </div>
    </div>
  );
}
