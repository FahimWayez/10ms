"use client";

import { useMemo, useState } from "react";
import { AccordionArrow } from "../../../public/svg/sectionIcons";

type Item = {
  id: string;
  questionText: string;
  answerHtml: string;
};

export default function FaqAccordionClient({
  items,
  initialVisible = 4,
  labels,
}: {
  items: Item[];
  initialVisible?: number;
  labels: { seeAll: string; seeLess: string };
}) {
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(items.length ? [items[0].id] : [])
  );
  const [showAll, setShowAll] = useState(false);

  const visibleItems = useMemo(
    () => (showAll ? items : items.slice(0, initialVisible)),
    [showAll, items, initialVisible]
  );

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const canToggleShowAll = items.length > initialVisible;

  return (
    <div className="relative p-2 sm:p-3 pb-8">
      <div className="divide-y divide-gray-200">
        {visibleItems.map((it) => {
          const isOpen = open.has(it.id);
          return (
            <div key={it.id} className="px-3 sm:px-4">
              <button
                type="button"
                onClick={() => toggle(it.id)}
                className="flex w-full items-center justify-between py-3 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${it.id}`}
              >
                <span className="font-semibold text-gray-800">
                  {it.questionText}
                </span>
                <AccordionArrow isOpen={isOpen} />
              </button>

              {isOpen && (
                <div id={`faq-panel-${it.id}`} className="pb-4">
                  <div
                    className="prose max-w-none text-[15px] leading-7 text-gray-700 prose-p:my-2 prose-li:my-1 prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5"
                    style={{ listStylePosition: "inside" }}
                    dangerouslySetInnerHTML={{ __html: it.answerHtml }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {canToggleShowAll && (
        <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full 
                        px-4 py-1 text-sm text-black/50 font-[14px]
                       shadow-sm z-10 bg-white"
          >
            <span>{showAll ? labels.seeLess : labels.seeAll}</span>
            <AccordionArrow isOpen={showAll} />
          </button>
        </div>
      )}
    </div>
  );
}
