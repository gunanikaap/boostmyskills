"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { images, primaryNav, authLinks } from "@/data/site";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catalogueOpen, setCatalogueOpen] = useState(false);
  const registerButtonClass =
    "!border-primary !bg-white !px-12 !py-2 !text-base !font-bold !leading-[30px] !text-ink hover:!border-primary hover:!bg-white hover:!text-ink";
  const signInButtonClass =
    "!border !border-primary !bg-primary !px-12 !py-2 !text-base !font-bold !leading-[30px] !text-white hover:!border-primary hover:!bg-primary hover:!text-white";

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[100] bg-white pb-2.5 pt-4">
        <Container className="flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center" aria-label="BoostMySkills home page">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images.logo} alt="BoostMySkills" className="h-14 w-[122px]" />
          </Link>

          {/* Desktop navigation - live layout: Catalogue on the left, CTAs far right. */}
          <nav className="hidden h-14 flex-1 items-center justify-between md:flex" aria-label="Primary">
            <div
              className="relative"
              onMouseEnter={() => setCatalogueOpen(true)}
              onMouseLeave={() => setCatalogueOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-[0.7rem] px-4 py-0 text-base font-semibold leading-none text-ink transition-colors hover:text-ink"
                aria-expanded={catalogueOpen}
                aria-haspopup="true"
                onClick={() => setCatalogueOpen((o) => !o)}
              >
                {primaryNav.label}
                <svg width="15" height="15" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 4.5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {catalogueOpen ? (
                <div className="absolute left-0 top-full w-60 rounded-xl border border-line bg-white p-2 shadow-lg">
                  {primaryNav.children.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface hover:text-primary"
                      onClick={() => setCatalogueOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-6 self-end">
              <Button
                href={authLinks.register}
                variant="light"
                className={registerButtonClass}
                external={authLinks.isExternal}
              >
                Register for free
              </Button>
              <Button
                href={authLinks.login}
                variant="primary"
                className={signInButtonClass}
                external={authLinks.isExternal}
              >
                Sign in
              </Button>
            </div>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="2" />
              )}
            </svg>
          </button>
        </Container>

        {/* Mobile menu */}
        {mobileOpen ? (
          <div className="border-t border-line bg-white md:hidden">
            <Container className="flex flex-col gap-1 py-4">
              <span className="px-1 text-xs font-semibold uppercase tracking-widest text-muted">
                {primaryNav.label}
              </span>
              {primaryNav.children.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-1 py-2 text-base font-medium text-ink"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2">
                <Button
                  href={authLinks.register}
                  variant="light"
                  className={`${registerButtonClass} w-full`}
                  external={authLinks.isExternal}
                >
                  Register for free
                </Button>
                <Button
                  href={authLinks.login}
                  variant="primary"
                  className={`${signInButtonClass} w-full`}
                  external={authLinks.isExternal}
                >
                  Sign in
                </Button>
              </div>
            </Container>
          </div>
        ) : null}
      </header>
      <div aria-hidden="true" className="h-[82px]" />
    </>
  );
}
