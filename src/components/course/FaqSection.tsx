import type { TENMSProduct } from "@/lib/tenms";
import { getDictionary, type Lang } from "@/i18n/dictionary";
import FaqAccordionClient from "./FaqAccordionClient";

type FaqValue = {
  id: string;
  question?: string;
  answer?: string;
};

function stripHtml(html?: string) {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default async function FaqSection({
  data,
  lang,
  initialVisible = 4,
}: {
  data: TENMSProduct["data"];
  lang: Lang;
  initialVisible?: number;
}) {
  const t = getDictionary(lang);

  const sec = data.sections?.find((s) => s.type === "faq");
  const raw = sec?.values;
  const values: FaqValue[] = Array.isArray(raw) ? (raw as FaqValue[]) : [];
  if (values.length === 0) return null;

  const items = values.map((v, i) => ({
    id: v.id ?? String(i),
    questionText: stripHtml(v.question) || "—",
    answerHtml: v.answer ?? "",
  }));

  const heading = t.tabs?.faq || sec?.name || "Frequently Ask Questions";

  return (
    <section id="faq" className="bg-white">
      <div className="p-4 sm:p-5">
        <h2 className="mb-3 text-[20px] md:text-[24px] font-semibold text-gray-900">
          {heading}
        </h2>

        <div className="rounded-xl border border-gray-200 bg-white">
          <FaqAccordionClient
            items={items}
            initialVisible={initialVisible}
            labels={{
              seeAll: t.buttons?.seeAll ?? "See all",
              seeLess: t.buttons?.seeLess ?? "See less",
            }}
          />
        </div>
      </div>
    </section>
  );
}
