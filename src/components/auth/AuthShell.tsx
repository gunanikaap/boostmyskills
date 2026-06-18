import Link from "next/link";
import { type ReactNode } from "react";
import { images } from "@/data/site";

/**
 * Full-page demo auth screen, mirroring the live BoostMySkills login/register
 * layout: pale-green background, logo, a left intro heading and a right white
 * card with Register / Sign in tabs.
 *
 * Rendered as a fixed full-screen overlay (z above the marketing Header/Footer)
 * so the auth pages feel standalone WITHOUT modifying the shared layout.
 *
 * The form does real auth when a backend is configured (see src/lib/auth) and
 * falls back to a demo notice otherwise.
 */
export default function AuthShell({
  active,
  children,
}: {
  active: "register" | "login";
  children: ReactNode;
}) {
  const tab =
    "flex-1 rounded-full py-2.5 text-center text-sm font-bold transition-colors";

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-surface-alt">
      <div className="mx-auto flex min-h-full w-full max-w-container flex-col px-6 py-8 lg:px-10">
        <Link
          href="/"
          aria-label="BoostMySkills home page"
          className="inline-flex w-fit"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.logo} alt="BoostMySkills" className="h-14 w-[122px]" />
        </Link>

        <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-2">
          <div>
            <h1 className="text-[2.75rem] font-bold leading-[1.1] text-ink sm:text-5xl lg:text-[3.5rem]">
              Start learning
              <br />
              with
              <br />
              BoostMySkills
            </h1>
            <p className="mt-6 text-lg text-muted">
              100% free. No credit card needed.
            </p>
          </div>

          <div className="mx-auto w-full max-w-[440px] rounded-[1.5rem] bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <div className="flex rounded-full bg-surface p-1">
              <Link
                href="/register"
                className={`${tab} ${
                  active === "register"
                    ? "bg-primary text-white"
                    : "text-ink hover:text-primary"
                }`}
              >
                Register
              </Link>
              <Link
                href="/login"
                className={`${tab} ${
                  active === "login"
                    ? "bg-primary text-white"
                    : "text-ink hover:text-primary"
                }`}
              >
                Sign in
              </Link>
            </div>

            <div className="mt-7">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
