// src/components/course/ExclusiveFeaturesSection.tsx
import type { TENMSProduct } from "@/lib/tenms";
import { getDictionary, type Lang } from "@/i18n/dictionary";
import { CheckIcon } from "../../../public/svg/sectionIcons";

type ExclusiveValue = {
  id: string;
  title?: string;
  checklist?: string[]; // array of bullet points
  file_type?: "image" | "video";
  file_url?: string; // image or video url
  video_thumbnail?: string; // optional thumbnail for video
};

export default async function ExclusiveFeaturesSection({
  data,
  lang,
}: {
  data: TENMSProduct["data"];
  lang: Lang;
}) {
  const t = getDictionary(lang);

  const sec = data.sections?.find((s) => s.type === "feature_explanations");
  const raw = sec?.values;
  const values: ExclusiveValue[] = Array.isArray(raw)
    ? (raw as ExclusiveValue[])
    : [];

  if (values.length === 0) return null;

  const heading =
    t.tabs?.exclusiveFeatures || sec?.name || "Course Exclusive Feature";

  return (
    <section id="exclusive-features" className="bg-white">
      <div className="p-4 sm:p-5">
        <h2 className="mb-3 text-[20px] md:text-[24px] font-semibold text-gray-900">
          {heading}
        </h2>

        <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-200">
          {values.map((v, idx) => {
            const mediaThumb =
              v.file_type === "video"
                ? v.video_thumbnail || v.file_url
                : v.file_url;

            return (
              <div
                key={v.id ?? idx}
                className="grid grid-cols-1 gap-4 p-4 sm:p-5 md:grid-cols-12"
              >
                <div className="md:col-span-7">
                  {v.title ? (
                    <h3 className="mb-2 text-[16px] font-semibold">
                      {v.title}
                    </h3>
                  ) : null}

                  {Array.isArray(v.checklist) && v.checklist.length > 0 ? (
                    <ul className="space-y-3">
                      {v.checklist.map((item, i) => (
                        <li key={`${v.id}-li-${i}`} className="flex gap-3">
                          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center ">
                            <CheckIcon />
                          </span>
                          <span className="text-[16px] leading-6 text-[#757d88]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <div className="md:col-span-5 flex items-center justify-center">
                  {mediaThumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={mediaThumb}
                      alt={v.title ?? ""}
                      className="h-75% w-75% max-h-64  object-cover"
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
