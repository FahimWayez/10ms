"use client";

import { useMemo, useState } from "react";
import { NextIcon, PreviousIcon } from "../../../public/svg/commonIcons";

type MediaItem = {
  name?: string;
  resource_type: "video" | "image";
  resource_value: string;
  thumbnail_url?: string;
};

export default function MediaCarousel({
  media,
  preferredId,
  className,
  thumbnailLimit = 8,
}: {
  media: MediaItem[];
  preferredId?: string | null;
  className?: string;
  thumbnailLimit?: number;
}) {
  const items = useMemo(
    () =>
      (media || []).filter(
        (m) =>
          (m.resource_type === "video" && !!m.resource_value) ||
          (m.resource_type === "image" && !!m.resource_value)
      ),
    [media]
  );

  const initial = useMemo(() => {
    if (!items.length) return 0;
    if (!preferredId) return 0;
    const idx = items.findIndex(
      (m) => m.resource_type === "video" && m.resource_value === preferredId
    );
    return idx >= 0 ? idx : 0;
  }, [items, preferredId]);

  const [index, setIndex] = useState(initial);
  const current = items[index];

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  if (!current) {
    return (
      <div
        className={[
          "aspect-video w-full rounded-md bg-gray-100",
          className,
        ].join(" ")}
      />
    );
  }

  return (
    <div className={className}>
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        {current.resource_type === "video" ? (
          <iframe
            key={`v-${current.resource_value}`}
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${current.resource_value}`}
            title="Course trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`i-${current.resource_value}`}
            src={current.resource_value}
            alt={current.name ?? "media"}
            className="h-full w-full object-cover"
          />
        )}

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous media"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow ring-1 ring-black/10 hover:bg-gray-50"
            >
              <PreviousIcon />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next media"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow ring-1 ring-black/10 hover:bg-gray-50"
            >
              <NextIcon />
            </button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {items.slice(0, thumbnailLimit).map((m, i) => {
            const isActive = i === index;
            const isVideo = m.resource_type === "video";
            const thumb =
              m.thumbnail_url ||
              (isVideo
                ? `https://img.youtube.com/vi/${m.resource_value}/hqdefault.jpg`
                : m.resource_value);

            return (
              <button
                key={`${m.name ?? "m"}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                className={[
                  "h-12 w-20 shrink-0 overflow-hidden rounded border",
                  isActive
                    ? "border-emerald-500 ring-2 ring-emerald-200"
                    : "border-gray-200",
                ].join(" ")}
                title={m.name ?? ""}
                aria-current={isActive ? "true" : "false"}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb}
                  alt={m.name ?? ""}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
