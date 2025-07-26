"use client";

import { useTransition } from "react";
import { setLangAction } from "@/app/actions";

export default function LangSwitch({
  activeLang,
}: {
  activeLang: "en" | "bn";
}) {
  const [isPending, startTransition] = useTransition();

  const toggle = (lang: "en" | "bn") => {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("lang", lang);
      await setLangAction(fd);
    });
  };

  const isEN = activeLang === "en";

  return (
    <div className="inline-flex items-center rounded-md border border-gray-200 p-1">
      <button
        title="Switch Language"
        name="langEN"
        type="button"
        className={`rounded px-2 py-1 text-sm cursor-pointer ${
          isEN ? "bg-gray-900 text-white" : "text-gray-700"
        }`}
        onClick={() => toggle("en")}
        disabled={isPending}
        aria-pressed={isEN}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        title="Switch Language"
        name="langBN"
        type="button"
        className={`rounded px-2 py-1 text-sm cursor-pointer ${
          !isEN ? "bg-gray-900 text-white" : "text-gray-700"
        }`}
        onClick={() => toggle("bn")}
        disabled={isPending}
        aria-pressed={!isEN}
        aria-label="Switch to Bangla"
      >
        বাং
      </button>
    </div>
  );
}
