"use client";

import { useEffect, useRef, useState } from "react";
import { BigNextIcon, BigPreviousIcon } from "../../../public/svg/commonIcons";
import { QuoteIcon } from "../../../public/svg/sectionIcons";

type Item = {
  id: string;
  title: string;
  subtitle?: string;
  avatar?: string;
  media?: string;
  videoId?: string;
};

export default function TestimonialsCarousel({ items }: { items: Item[] }) {
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

  const scrollByPage = (dir: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "next" ? el.clientWidth : -el.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scrollByPage("prev")}
        disabled={atStart}
        aria-label="Previous"
        className={`
          absolute left-[-12px] top-1/2 z-10 -translate-y-1/2
          hidden md:flex h-9 w-9 items-center justify-center
          rounded-full bg-gray-200/70 text-gray-700 ring-1 ring-black/10 backdrop-blur
          ${atStart ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-300"}
        `}
      >
        <BigPreviousIcon />
      </button>

      <button
        onClick={() => scrollByPage("next")}
        disabled={atEnd}
        aria-label="Next"
        className={`
          absolute right-[-12px] top-1/2 z-10 -translate-y-1/2
          hidden md:flex h-9 w-9 items-center justify-center
          rounded-full bg-gray-200/70 text-gray-700 ring-1 ring-black/10 backdrop-blur
          ${atEnd ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-300"}
        `}
      >
        <BigNextIcon />
      </button>

      <div
        ref={scrollerRef}
        className="pl-3 pt-3 snap-x snap-mandatory overflow-x-auto scrollbar-hide"
      >
        <div className="flex gap-6 pr-2">
          {items.map((it) => (
            <article
              key={it.id}
              className={`
              relative
                snap-start shrink-0
                w-full md:w-[calc(50%-1.5rem)]
                bg-white rounded-xl border border-gray-200
                p-4 md:p-5
              `}
            >
              <span className="absolute -top-3 -left-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#fce0d6] ring-1 ring-[#fce0d6]">
                <QuoteIcon />
              </span>
              <div className="overflow-hidden rounded-lg">
                {it.media ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={it.media}
                    alt={it.title}
                    className="w-full aspect-video object-cover"
                  />
                ) : (
                  <div className="w-full aspect-video bg-gray-100" />
                )}

                <span className="pointer-events-none absolute left-1/2 top-28 -translate-x-1/2 -translate-y-1/2 inline-flex h-24 w-24 items-center justify-center rounded-full bg-white/45 ring-1 ring-black/10 cursor-pointer">
                  <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/95 ring-1 ring-black/10">
                    <img
                      src={
                        "https://10minuteschool.com/images/annual_exam/play_icon_2.svg"
                      }
                      alt={it.title}
                    />
                  </span>
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                {it.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={it.avatar}
                    alt={it.title}
                    className="h-9 w-9 rounded-full object-cover ring-1 ring-black/10"
                  />
                ) : (
                  <span className="h-9 w-9 rounded-full bg-gray-200 ring-1 ring-black/10" />
                )}
                <div>
                  <div className="text-[15px] font-medium text-gray-900">
                    {it.title}
                  </div>
                  {it.subtitle && (
                    <div className="text-[13px] text-gray-500">
                      {it.subtitle}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
