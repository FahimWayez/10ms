"use client";

import { useState } from "react";
import { AccordionArrow } from "../../../public/svg/sectionIcons";

type Item = { id: string; title: string; html: string };

export default function AboutAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(items.length ? [items[0].id] : [])
  );

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="divide-y divide-gray-200">
      {items.map((it) => {
        const isOpen = open.has(it.id);
        return (
          <div key={it.id} className="px-4 sm:px-5">
            <button
              type="button"
              onClick={() => toggle(it.id)}
              className="flex w-full items-center justify-between py-3 text-left"
              aria-expanded={isOpen}
              aria-controls={`about-panel-${it.id}`}
            >
              <span className="font-semibold text-[16px] text-gray-800">
                {it.title}
              </span>
              <AccordionArrow isOpen={isOpen} />
            </button>

            {isOpen && (
              <div id={`about-panel-${it.id}`} className="pb-4">
                <div
                  className="prose max-w-none text-[15px] leading-7 text-gray-700 prose-p:my-2 prose-li:my-1 prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5"
                  style={{ listStylePosition: "inside" }}
                  dangerouslySetInnerHTML={{ __html: it.html }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
