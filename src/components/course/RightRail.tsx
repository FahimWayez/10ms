import type { TENMSProduct } from "@/lib/tenms";
import { getDictionary, type Lang } from "@/i18n/dictionary";
import Link from "next/link";
import MediaCarousel from "./MediaCarousel";
import { PhoneIcon } from "../../../public/svg/commonIcons";

function pickTrailerId(data: TENMSProduct["data"]) {
  const vid = data.media?.find((m) => m.resource_type === "video");
  return vid?.resource_value || null;
}

export default async function RightRail({
  data,
  lang,
  variant = "combined",
}: {
  data: TENMSProduct["data"];
  lang: Lang;
  variant?: "media" | "details" | "combined";
}) {
  const t = getDictionary(lang);
  const preferredId = pickTrailerId(data);
  const media = data.media ?? [];

  const price = 1000;
  const ctaLabel = lang === "bn" ? "কোর্সটি কিনুন" : t.cta?.enroll ?? "Enroll";

  const Details = () => (
    <>
      <div className="mt-4">
        <div className="mb-3 text-2xl font-semibold text-gray-900">
          ৳{price}
        </div>
        <button
          style={{ boxShadow: "inset 0 -4px 0 #14773b" }}
          className="w-full rounded-md bg-[#1cab55] py-2.5 text-white hover:bg-[#14773b] cursor-pointer"
        >
          {ctaLabel}
        </button>
      </div>

      {Array.isArray(data.checklist) && data.checklist.length > 0 ? (
        <div className="mt-4 pb-2">
          <h3 className="mb-3 text-[20px] font-semibold text-gray-900">
            {t.meta?.includes ?? "What’s included"}
          </h3>
          <ul className="space-y-2 text-[16px] text-gray-700">
            {data.checklist.map((item) => (
              <li key={item.id} className="flex items-start gap-2">
                {item.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.icon}
                    alt=""
                    className="mt-0.5 h-4 w-4 shrink-0"
                  />
                ) : (
                  <span className="mt-0.5 inline-block h-4 w-4 shrink-0 bg-gray-200" />
                )}
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );

  if (variant === "media") {
    return (
      <div className=" border border-gray-200 bg-white p-1 shadow-sm">
        <MediaCarousel media={media} preferredId={preferredId} />
      </div>
    );
  }

  if (variant === "details") {
    return (
      <div className="-mx-5">
        <Details />
      </div>
    );
  }

  return (
    <div className="md:sticky md:top-20">
      <div className="border border-gray-200 bg-white p-1 shadow-sm">
        <MediaCarousel media={media} preferredId={preferredId} />
        <div className="px-2">
          <Details />
        </div>
      </div>

      <div className="mt-3 hidden justify-between pt-3 text-[14px] text-gray-500 md:flex">
        <span>{t.meta?.help ?? "For more info"} </span>
        <span>
          <Link
            href="tel:16910"
            className="text-[#1cab55] underline inline-flex items-center gap-1"
            title="16910"
          >
            <PhoneIcon />
            {t.meta?.call ?? "Call (16910)"}
          </Link>
        </span>
      </div>
    </div>
  );
}
