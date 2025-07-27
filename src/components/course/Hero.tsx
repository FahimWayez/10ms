import { getDictionary, type Lang } from "@/i18n/dictionary";
import type { TENMSProduct } from "@/lib/tenms";
import { StarIcon } from "../../../public/svg/sectionIcons";
import RightRail from "./RightRail";

export default async function Hero({
  data,
  lang,
}: {
  data: TENMSProduct["data"];
  lang: Lang;
}) {
  const t = getDictionary(lang);

  return (
    <section className="w-full bg-gradient-to-b from-[#00001E] via-[#020024] to-[#001F55] py-4 md:py-16 md:pb-20 md:px-42">
      <div className="px-4">
        <div className="md:hidden mb-4">
          <RightRail data={data} lang={lang} variant="media" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 text-white">
            <h1 className="text-[21px] md:text-[36px] font-semibold tracking-tight">
              {data.title}
            </h1>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <span className="text-white text-[14px] md:text-[16px]">
                (82.6% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)
              </span>
            </div>

            {data.description ? (
              <div
                className="prose prose-invert mt-3 max-w-none prose-p:leading-relaxed prose-p:my-2 text-[#87868c]"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            ) : null}
          </div>

          <div className="md:col-span-4" />
        </div>
      </div>
    </section>
  );
}
