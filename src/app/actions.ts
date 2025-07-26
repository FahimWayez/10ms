"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function setLangAction(formData: FormData) {
  const lang = (formData.get("lang") as string) === "bn" ? "bn" : "en";
  (await cookies()).set("TENMS_LANG", lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  revalidatePath("/", "layout");
}
