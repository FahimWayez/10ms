import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { getDictionary, type Lang } from "@/i18n/dictionary";
import LangSwitch from "./LangSwitch";
import {
  DownArrow,
  Hamburger,
  PhoneIcon,
  SearchIcon,
} from "../../public/svg/commonIcons";

export default async function Header() {
  const langCookie = (await cookies()).get("TENMS_LANG")?.value as
    | Lang
    | undefined;
  const lang: Lang = langCookie === "bn" ? "bn" : "en";
  const t = getDictionary(lang);

  return (
    <header className="sticky top-0 left-0 z-50 w-full border-b border-gray-100 bg-white backdrop-blur px-2 md:px-24 py-2">
      <div className="container-fluid">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between py-3 md:hidden">
            <button type="button" className="p-2">
              <Hamburger />
            </button>

            <Link href="/" className="shrink-0">
              <Image
                src="/logo.png"
                alt="10 Minute School"
                width={100}
                height={32}
                priority
              />
            </Link>

            <button type="button" className="p-2">
              <SearchIcon />
            </button>

            <Link href="tel:16910" className="p-2">
              <PhoneIcon />
            </Link>

            <Link
              href="#"
              className="rounded-md bg-[#1cab55] px-4 py-2 text-sm font-medium text-white"
            >
              {t.login}
            </Link>
          </div>
          <nav className="mx-8 ml-4 items-center gap-6 text-sm text-gray-700 flex md:hidden ">
            {[t.class612, t.skills, t.admission, t.more].map((label) => (
              <Link
                key={label}
                href="#"
                className="flex items-center gap-1 transition-colors hover:text-gray-900"
              >
                {label} {<DownArrow />}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex h-16 items-center gap-3">
          <Link href="/" className="shrink-0 flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="10 Minute School"
              width={140}
              height={32}
              priority
            />
          </Link>

          <div className="relative ml-2 hidden flex-1 items-center md:flex">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
            <input
              className="w-full rounded-full border border-gray-200 bg-white px-10 py-2.5 text-sm placeholder-gray-400 outline-none"
              placeholder={t.searchPlaceholder}
              aria-label="Search"
            />
          </div>

          <nav className="mx-8 ml-4 hidden items-center gap-6 text-sm text-gray-700 lg:flex">
            {[
              t.class612,
              t.skills,
              t.admission,
              t.onlineBatch,
              t.englishCentre,
              t.more,
            ].map((label) => (
              <Link
                key={label}
                href="#"
                className="flex items-center gap-1 transition-colors hover:text-gray-900"
              >
                {label} {<DownArrow />}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <LangSwitch activeLang={lang} />

            <Link
              href="tel:16910"
              className="hidden items-center gap-1 rounded-md px-2.5 py-2 text-sm text-[#1cab55] sm:flex"
            >
              <PhoneIcon />
              <span>16910</span>
            </Link>

            <Link
              href="#"
              className="rounded-md bg-[#1cab55] px-8 py-2 text-sm font-medium text-white"
            >
              {t.login}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
