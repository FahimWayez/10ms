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
    // has("pointers") && {
    //   href: "#learn2",
    //   label: t?.tabs?.learn ?? "What you will learn by doing the course",
    // },
    // has("pointers") && {
    //   href: "#learn3",
    //   label: t?.tabs?.learn ?? "What you will learn by doing the course",
    // },
    // has("pointers") && {
    //   href: "#learn4",
    //   label: t?.tabs?.learn ?? "What you will learn by doing the course",
    // },
  ].filter(Boolean) as SectionNavItem[];

  return (
    <>
      <Hero data={data} lang={lang} />

      <div className="px-10 lg:px-24 md:hidden">
        <RightRail data={data} lang={lang} variant="details" />
      </div>

      <section className="py-6">
        <div className="lg:px-24">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-8 space-y-6">
              {items.length > 0 && (
                <div className="hidden md:block">
                  <SectionNav items={items} />
                </div>
              )}
              <InstructorSection data={data} lang={lang} />
              <FeaturesSection data={data} lang={lang} />
              <FreePdfSection data={data} lang={lang} />
            </div>

            <aside className="hidden md:block md:col-span-4 md:-mt-72">
              <RightRail data={data} lang={lang} variant="combined" />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
