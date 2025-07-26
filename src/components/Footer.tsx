import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { getDictionary, type Lang } from "@/i18n/dictionary";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TiktokIcon,
  YoutubeIcon,
} from "../../public/svg/footerIcons";

type SocialProps = {
  href: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

function Social({ href, label, Icon }: SocialProps) {
  return (
    <Link href={href} aria-label={label}>
      <Icon aria-hidden="true" />
    </Link>
  );
}

export default async function Footer() {
  const langCookie = (await cookies()).get("TENMS_LANG")?.value as
    | Lang
    | undefined;
  const lang: Lang = langCookie === "bn" ? "bn" : "en";
  const t = getDictionary(lang);

  return (
    <footer className="mt-16 border-t border-gray-100 bg-white px-10 lg:px-24 py-2">
      <div className="container-fluid grid grid-cols-1 md:grid-cols-4 gap-10 py-10 text-center md:text-left">
        <div className="space-y-4 justify-center">
          <div className="flex justify-center md:justify-normal">
            <Image
              src="/logo.png"
              alt="10 Minute School"
              width={100}
              height={100}
            />
          </div>
          <p className="text-sm text-gray-600">{t.footer.downloadApp}</p>
          <div className="flex gap-3">
            <Link href="#" aria-label="Get it on Google Play">
              <Image
                src="/svg/gplay.svg"
                alt="Google Play"
                width={150}
                height={45}
              />
            </Link>
            <Link href="#" aria-label="Download on the App Store">
              <Image
                src="/svg/appstore.svg"
                alt="App Store"
                width={150}
                height={45}
              />
            </Link>
          </div>
        </div>

        <div className="col-span-2 flex justify-evenly text-left  gap-12">
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t.footer.company}</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  {t.footer.career}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  {t.footer.joinTeacher}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  {t.footer.joinAffiliate}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  {t.footer.refund}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">{t.footer.others}</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  {t.footer.blog}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  {t.footer.bookStore}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  {t.footer.freeNotes}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  {t.footer.jobPrep}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  {t.footer.verifyCert}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  {t.footer.freeDownload}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="hidden md:block">
          <h3 className="mb-4 text-lg font-semibold">{t.footer.keepUp}</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <span className="text-gray-500">{t.callUs || "Call Us"}: </span>
              <a href="tel:16910" className="text-[#1cab55] hover:underline">
                16910
              </a>{" "}
              (24×7)
            </li>
            <li>
              <span className="text-gray-500">{t.footer.whatsapp}:</span>{" "}
              <a
                href="https://wa.me/8801896016252"
                className="text-[#1cab55] hover:underline"
              >
                +8801896016252
              </a>{" "}
              (24×7)
            </li>
            <li>
              <span className="text-gray-500">{t.footer.outsideBD}:</span>{" "}
              <a
                href="tel:+8809610916910"
                className="text-[#1cab55] hover:underline"
              >
                +880 9610916910
              </a>
            </li>
            <li>
              <span className="text-gray-500">{t.footer.emailUs}:</span>{" "}
              <a
                href="mailto:support@10minuteschool.com"
                className="text-[#1cab55] hover:underline"
              >
                support@10minuteschool.com
              </a>
            </li>
          </ul>

          <div className="mt-4 flex gap-2">
            <Social href="#" label="Facebook" Icon={FacebookIcon} />
            <Social href="#" label="Instagram" Icon={InstagramIcon} />
            <Social href="#" label="LinkedIn" Icon={LinkedInIcon} />
            <Social href="#" label="YouTube" Icon={YoutubeIcon} />
            <Social href="#" label="TikTok" Icon={TiktokIcon} />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 py-4 flex flex-col justify-center items-center gap-4">
        <div className="mt-4 flex md:hidden gap-4 items-center">
          <Social href="#" label="Facebook" Icon={FacebookIcon} />
          <Social href="#" label="Instagram" Icon={InstagramIcon} />
          <Social href="#" label="LinkedIn" Icon={LinkedInIcon} />
          <Social href="#" label="YouTube" Icon={YoutubeIcon} />
          <Social href="#" label="TikTok" Icon={TiktokIcon} />
        </div>
        <div className="container-fluid text-center text-sm text-gray-500">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
