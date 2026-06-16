import Link from "next/link";
import Container from "@/components/layout/Container";
import { images, footerColumns, externalLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div className="space-y-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.logo} alt="BoostMySkills" className="h-10 w-auto" />
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Free, fully funded sustainability courses developed by pan-European and
            international universities.
          </p>
          <a
            href={externalLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="RES4CITY on LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white transition-colors hover:border-primary"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images.linkedin} alt="" className="h-4 w-4" />
          </a>
        </div>

        {footerColumns.map((column) => (
          <div key={column.heading}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
              {column.heading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted sm:flex-row">
          <p>&copy; {new Date().getFullYear()} BoostMySkills. All rights reserved.</p>
          <p>Co-funded by the European Union, the Swiss Confederation and COSS.</p>
        </Container>
      </div>
    </footer>
  );
}
