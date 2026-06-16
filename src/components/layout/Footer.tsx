import Link from "next/link";
import Container from "@/components/layout/Container";
import { images, footerColumns, externalLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-white py-6">
      <Container className="grid gap-10 md:grid-cols-[160px_1fr] lg:items-start lg:justify-between">
        <div className="flex flex-col">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.logo} alt="BoostMySkills" className="h-14 w-[122px] object-contain" />
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerColumns.map((column) => {
            const isContact = column.heading === "Get in touch";
            return (
              <div key={column.heading || "links"}>
                {column.heading ? (
                  <h3 className="mb-4 text-[0.83rem] font-medium leading-[1.4rem] text-muted">
                    {column.heading}
                  </h3>
                ) : null}
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-semibold leading-[1.55rem] text-ink transition-colors hover:text-primary lg:text-[1.2rem]"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-base font-semibold leading-[1.55rem] text-ink transition-colors hover:text-primary lg:text-[1.2rem]"
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
                        className="mt-3 inline-flex"
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
        </div>
      </Container>
    </footer>
  );
}
