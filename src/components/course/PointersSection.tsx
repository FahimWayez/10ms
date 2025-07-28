import type { TENMSProduct } from "@/lib/tenms";
import { getDictionary, type Lang } from "@/i18n/dictionary";
import { CheckIcon } from "../../../public/svg/sectionIcons";

type PointerValue = {
  id: string;
  text: string;
  color?: string;
  icon?: string;
};

export default async function PointersSection({
  data,
  lang,
}: {
  data: TENMSProduct["data"];
  lang: Lang;
}) {
  const t = getDictionary(lang);

  const raw = data.sections?.find((s) => s.type === "pointers")?.values;
  const values: PointerValue[] = Array.isArray(raw)
    ? (raw as PointerValue[])
    : [];

  if (values.length === 0) return null;

  return (
    <section id="learn" className="bg-white">
      <div className="p-4 sm:p-5">
        <h2 className="mb-3 text-[20px] md:text-[24px] font-semibold text-gray-900">
          {t.tabs.learn}
        </h2>

        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2"
          >
            {values.map((v) => (
              <li key={v.id} className="flex items-start gap-3">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center ">
                  <CheckIcon />
                </span>
                <span className="text-[16px] leading-6 text-gray-800">
                  {v.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
