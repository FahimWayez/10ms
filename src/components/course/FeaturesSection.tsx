import type { TENMSProduct } from "@/lib/tenms";
import { getDictionary, type Lang } from "@/i18n/dictionary";

interface FeatureValue {
  id: string;
  icon?: string;
  title: string;
  subtitle?: string;
}

export default async function FeaturesSection({
  data,
  lang,
}: {
  data: TENMSProduct["data"];
  lang: Lang;
}) {
  const t = getDictionary(lang);

  const raw = data.sections?.find((s) => s.type === "features")?.values;
  const values: FeatureValue[] = Array.isArray(raw)
    ? (raw as FeatureValue[])
    : [];

  if (values.length === 0) return null;

  return (
    <section id="layout" className="rounded-lg bg-white">
      <div className="p-4 sm:p-5">
        <h2 className="mb-3 text-[20px] font-semibold text-gray-900">
          {t.tabs.layout}
        </h2>

        <div className="rounded-xl bg-[#121a2f] p-4 sm:p-5 text-white">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {values.map((f) => (
              <div key={f.id} className="p-4">
                <div className="flex items-start gap-3">
                  {f.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={f.icon} alt="" className="h-8 w-8" />
                  ) : (
                    <span className="mt-0.5 block h-6 w-6 rounded-full bg-white/20" />
                  )}
                  <div>
                    <div className="font-medium text-[18px]">{f.title}</div>
                    {f.subtitle && (
                      <div className="mt-1 text-[14px] text-[#9CA3AF]">
                        {f.subtitle}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
