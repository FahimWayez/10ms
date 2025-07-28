import type { TENMSProduct } from "@/lib/tenms";
import { getDictionary, type Lang } from "@/i18n/dictionary";
import TestimonialsCarousel from "./TestimonialsCarousel";

type TestimonialValue = {
  id: string;
  name?: string;
  profile_image?: string;
  testimonial?: string;
  description?: string;
  thumb?: string;
  video_url?: string;
};

export default async function TestimonialsSection({
  data,
  lang,
}: {
  data: TENMSProduct["data"];
  lang: Lang;
}) {
  const t = getDictionary(lang);

  const sec = data.sections?.find((s) => s.type === "testimonials");
  const raw = sec?.values;
  const values: TestimonialValue[] = Array.isArray(raw)
    ? (raw as TestimonialValue[])
    : [];

  if (values.length === 0) return null;

  const items = values.map((v, idx) => {
    const title = v.name ?? "";
    const subtitle =
      v.description && v.description.trim().length > 0
        ? v.description
        : v.testimonial && v.testimonial.startsWith("IELTS")
        ? v.testimonial
        : "";
    const media =
      v.thumb ||
      (v.video_url
        ? `https://img.youtube.com/vi/${v.video_url}/hqdefault.jpg`
        : undefined);

    return {
      id: v.id ?? String(idx),
      title,
      subtitle,
      avatar: v.profile_image,
      media,
      videoId: v.video_url,
    };
  });

  return (
    <section id="testimonials" className="bg-white">
      <div className="p-4 sm:p-5">
        <h2 className="mb-3 text-[20px] md:text-[24px] font-semibold text-gray-900">
          {t.tabs?.testimonials ||
            (lang === "bn" ? "শিক্ষার্থীরা যা বলছে" : "Students opinion")}
        </h2>

        <div className="bg-white">
          <TestimonialsCarousel items={items} />
        </div>
      </div>
    </section>
  );
}
