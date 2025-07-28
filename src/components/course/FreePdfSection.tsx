import type { TENMSProduct } from "@/lib/tenms";
import { getDictionary, type Lang } from "@/i18n/dictionary";
import Link from "next/link";

type PdfPromo = {
  title?: string;
  description?: string;
  thumbnail?: string;
  cta?: {
    text?: string;
    clicked_url: string;
  };
};

export default async function FreePdfSection({
  data,
  lang,
}: {
  data: TENMSProduct["data"];
  lang: Lang;
}) {
  const t = getDictionary(lang);

  const promo = data.sections?.find((s) => s.type === "group_join_engagement")
    ?.values?.[0] as PdfPromo | undefined;

  if (!promo) return null;

  const title =
    promo.title ?? t.pdf?.title ?? (lang === "bn" ? "Free PDF" : "Free PDF");

  const buttonLabel =
    promo.cta?.text ??
    t.pdf?.button ??
    (lang === "bn" ? "ফ্রি PDF Download করুন" : "Download PDF");

  return (
    <section className="mt-6 rounded-lg bg-white">
      <div className="p-4 sm:p-5">
        <div
          style={{
            backgroundImage:
              "url('https://cdn.10minuteschool.com/images/Free_class_card_BG_1722414654287.png')",
            backgroundSize: "cover",
          }}
          className="overflow-hidden rounded-xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-white">
              <span className="inline-flex items-center justify-center">
                <img
                  src="https://cdn.10minuteschool.com/images/catalog/product/pointer/467478234_1276985680016189_8175110495169425888_n_1732621183218.png"
                  alt="Free PDF Icon"
                  width={150}
                  height={150}
                />
              </span>

              {/* <h3 className="text-[24px] font-bold bg-gradient-to-r from-[#e4a62e] to-[#ea5c4f] bg-clip-text text-transparent   ">
                {"Free PDF"}
              </h3> */}
            </div>
            <h3 className="text-[20px] font-bold text-white mt-2">{title}</h3>
            {promo.description && (
              <p className="mt-3 max-w-xl text-white text-[16px]">
                {promo.description}
              </p>
            )}
            {promo.cta?.clicked_url && (
              <Link
                href={promo.cta.clicked_url}
                style={{ boxShadow: "inset 0 -4px 0 #14773b" }}
                className="mt-5 inline-block rounded-md bg-[#1cab55] px-4 py-2 text-white font-medium hover:bg-[#14773b]"
              >
                {buttonLabel}
              </Link>
            )}
          </div>

          {promo.thumbnail && (
            <div className="hidden md:block">
              <img
                src={promo.thumbnail}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
