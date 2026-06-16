"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { images, primaryNav, externalLinks } from "@/data/site";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catalogueOpen, setCatalogueOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center" aria-label="BoostMySkills home page">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.logo} alt="BoostMySkills" className="h-9 w-auto" />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
          <div
            className="relative"
            onMouseEnter={() => setCatalogueOpen(true)}
            onMouseLeave={() => setCatalogueOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-ink transition-colors hover:text-primary"
              aria-expanded={catalogueOpen}
              aria-haspopup="true"
              onClick={() => setCatalogueOpen((o) => !o)}
            >
              {primaryNav.label}
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            {catalogueOpen ? (
              <div className="absolute left-0 top-full w-60 rounded-2xl border border-line bg-white p-2 shadow-card">
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

          <div className="ml-2 flex items-center gap-3">
            <Button href={externalLinks.register} variant="outline" external>
              Register for free
            </Button>
            <Button href={externalLinks.login} variant="primary" external>
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
              <Button href={externalLinks.register} variant="outline" external>
                Register for free
              </Button>
              <Button href={externalLinks.login} variant="primary" external>
                Sign in
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
