import type { TENMSProduct } from "@/lib/tenms";
import { getDictionary, type Lang } from "@/i18n/dictionary";
import AboutAccordion from "./AboutAccordion";

type AboutValue = {
  id: string;
  title?: string;
  description?: string;
};

function stripHtml(html?: string) {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default async function AboutSection({
  data,
  lang,
}: {
  data: TENMSProduct["data"];
  lang: Lang;
}) {
  const t = getDictionary(lang);

  const sec = data.sections?.find((s) => s.type === "about");
  const raw = sec?.values;
  const values: AboutValue[] = Array.isArray(raw) ? (raw as AboutValue[]) : [];
  if (values.length === 0) return null;

  const items = values.map((v, i) => ({
    id: v.id ?? String(i),
    title: stripHtml(v.title) || "—",
    html: v.description ?? "",
  }));

  const heading = t.tabs?.courseDetails || sec?.name || "Course details";

  return (
    <section id="about" className="bg-white">
      <div className="p-4 sm:p-5">
        <h2 className="mb-3 text-[20px] md:text-[24px] font-semibold text-gray-900">
          {heading}
        </h2>

        <div className="rounded-xl border border-gray-200 bg-white">
          <AboutAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
