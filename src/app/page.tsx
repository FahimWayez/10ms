import { cookies } from "next/headers";
import { fetchProduct } from "@/lib/tenms";
import Hero from "@/components/course/Hero";
import RightRail from "@/components/course/RightRail";
import InstructorSection from "@/components/course/InstructorSection";
import FeaturesSection from "@/components/course/FeaturesSection";
import SectionNav, {
  type SectionNavItem,
} from "@/components/course/SectionNav";
import { getDictionary } from "@/i18n/dictionary";
import FreePdfSection from "@/components/course/FreePdfSection";
import PointersSection from "@/components/course/PointersSection";
import AboutSection from "@/components/course/AboutSection";
import ExclusiveFeaturesSection from "@/components/course/ExclusiveFeaturesSection";
import TestimonialsSection from "@/components/course/TestimonialsSection";
import FaqSection from "@/components/course/FaqSection";

export default async function Page() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("TENMS_LANG")?.value === "bn" ? "bn" : "en") as
    | "en"
    | "bn";
  const { data } = await fetchProduct("ielts-course", lang);

  const t = getDictionary(lang);

  const has = (type: string) =>
    !!data.sections?.find((s) => s.type === type)?.values?.length;

  const items: SectionNavItem[] = [
    has("instructors") && {
      href: "#instructor",
      label: t?.tabs?.instructor ?? "Course instructor",
    },
    has("features") && {
      href: "#layout",
      label: t?.tabs?.layout ?? "How the course is laid out",
    },
    has("pointers") && {
      href: "#learn",
      label: t?.tabs?.learn ?? "What you will learn by doing the course",
    },
    has("about") && {
      href: "#about",
      label: t.tabs?.courseDetails ?? "Course details",
    },
    has("feature_explanations") && {
      href: "#exclusive-features",
      label: t.tabs?.exclusiveFeatures ?? "Exclusive Features",
    },
    has("testimonials") && {
      href: "#testimonials",
      label: t.tabs?.testimonials ?? "Students opinion",
    },
    has("faq") && {
      href: "#faq",
      label: t.tabs?.faq ?? "Frequently Ask Questions",
    },
  ].filter(Boolean) as SectionNavItem[];

  return (
    <>
      <Hero data={data} lang={lang} />

      <div className="container-fluid md:hidden">
        <RightRail data={data} lang={lang} variant="details" />
      </div>

      <section className="py-6">
        <div className="container-fluid">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-8 space-y-6">
              {items.length > 0 && (
                <div className="hidden md:block md:sticky top-20 bg-white z-10">
                  <SectionNav items={items} />
                </div>
              )}
              <InstructorSection data={data} lang={lang} />
              <FeaturesSection data={data} lang={lang} />
              <FreePdfSection data={data} lang={lang} />
              <PointersSection data={data} lang={lang} />
              <AboutSection data={data} lang={lang} />
              <ExclusiveFeaturesSection data={data} lang={lang} />
              <TestimonialsSection data={data} lang={lang} />
              <FaqSection data={data} lang={lang} />
            </div>

            <aside className="hidden md:block md:col-span-4 md:-mt-72">
              <RightRail data={data} lang={lang} variant="media" />
              <div className="md:sticky top-20">
                <RightRail data={data} lang={lang} variant="details" />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
