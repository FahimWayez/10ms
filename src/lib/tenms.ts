import { cookies } from "next/headers";

const BASE = "https://api.10minuteschool.com/discovery-service/api/v1";

export type TENMSLang = "en" | "bn";

export interface TENMSProduct {
  code: number;
  data: {
    slug: string;
    id: number;
    title: string;
    description: string;
    media: Array<{
      name: string;
      resource_type: "video" | "image";
      resource_value: string;
      thumbnail_url?: string;
    }>;
    checklist?: Array<{
      id: string;
      text: string;
      icon?: string;
      color?: string;
      list_page_visibility?: boolean;
    }>;
    cta_text?: { name: string; value: string };
    seo?: {
      title?: string;
      description?: string;
      keywords?: string[];
      defaultMeta?: Array<{
        type: "name" | "property";
        value: string;
        content: string;
      }>;
      schema?: Array<{ meta_name: string; meta_value: string; type: string }>;
    };
    sections?: Array<{
      type: string;
      name: string;
      description: string;
      order_idx: number;
      values: any[];
    }>;
  };
  message: string;
  status_code: number;
}

async function resolveLang(input?: TENMSLang): Promise<TENMSLang> {
  if (input === "en" || input === "bn") return input;
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("TENMS_LANG")?.value as
    | TENMSLang
    | undefined;
  return cookieLang === "bn" ? "bn" : "en";
}

async function get<T>(path: string, lang?: TENMSLang): Promise<T> {
  const L = await resolveLang(lang);
  const url = `${BASE}${path}${path.includes("?") ? "&" : "?"}lang=${L}`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "X-TENMS-SOURCE-PLATFORM": "web",
      accept: "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`TENMS API ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function fetchProduct(slug: string, lang?: TENMSLang) {
  return get<TENMSProduct>(`/products/${slug}?`, lang);
}

export function firstYouTubeId(product: TENMSProduct["data"]) {
  const vid = product.media?.find((m) => m.resource_type === "video");
  return vid?.resource_value || null;
}

export function instructorsSection(product: TENMSProduct["data"]) {
  return product.sections?.find((s) => s.type === "instructors")?.values ?? [];
}

export function featuresSection(product: TENMSProduct["data"]) {
  return product.sections?.find((s) => s.type === "features")?.values ?? [];
}

export function pointersSection(product: TENMSProduct["data"]) {
  return product.sections?.find((s) => s.type === "pointers")?.values ?? [];
}

export function aboutSection(product: TENMSProduct["data"]) {
  return product.sections?.find((s) => s.type === "about")?.values ?? [];
}

export function testimonialsSection(product: TENMSProduct["data"]) {
  return product.sections?.find((s) => s.type === "testimonials")?.values ?? [];
}
