import type { TENMSProduct } from "@/lib/tenms";
import { getDictionary, type Lang } from "@/i18n/dictionary";
import { BigNextIcon } from "../../../public/svg/commonIcons";
import Image from "next/image";

export default async function InstructorSection({
  data,
  lang,
}: {
  data: TENMSProduct["data"];
  lang: Lang;
}) {
  const t = getDictionary(lang);
  const instructors =
    data.sections?.find((s) => s.type === "instructors")?.values || [];
  if (!instructors.length) return null;
  const i = instructors[0];

  return (
    <section id="instructor" className="bg-white">
      <div className="p-4 sm:p-5">
        <h2 className="mb-3 text-[20px] md:text-[24px] font-semibold text-gray-900">
          {t.tabs.instructor}
        </h2>

        <div className="rounded-md md:border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="relative h-18 w-18 rounded-full overflow-hidden">
              <Image
                src="/profilephoto.jpg"
                alt="ad"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-gray-900 text-[18px] hover:text-[#1CAB55] hover:cursor-pointer flex gap-2 items-center">
                {i.name}
                <BigNextIcon />
              </div>

              {i.description ? (
                <div
                  className="prose max-w-none text-[14px] text-gray-700 prose-p:my-2"
                  dangerouslySetInnerHTML={{ __html: i.description }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
