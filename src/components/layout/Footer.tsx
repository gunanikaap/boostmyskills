import Link from "next/link";
import Container from "@/components/layout/Container";
import { images, footerColumns, externalLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.logo} alt="BoostMySkills" className="h-14 w-auto" />
        </div>

        {footerColumns.map((column) => {
          const isContact = column.heading === "Get in touch";
          return (
            <div key={column.heading || "links"}>
              {column.heading ? (
                <h3 className="text-xl font-bold text-ink">{column.heading}</h3>
              ) : null}
              <ul className={`space-y-2.5 ${column.heading ? "mt-4" : ""}`}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-ink transition-colors hover:text-primary"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="font-semibold text-ink transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
                {isContact ? (
                  <li>
                    <a
                      href={externalLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="BoostMySkills on LinkedIn"
                      className="mt-1 inline-flex"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={images.linkedin} alt="LinkedIn" className="h-6 w-6" />
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          );
        })}
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
