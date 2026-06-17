import Link from "next/link";
import { images, footerColumns, externalLinks } from "@/data/site";

export default function Footer() {
  const linkClass =
    "text-base font-semibold leading-[1.55rem] text-ink transition-colors hover:text-primary min-[900px]:text-[1.2rem]";
  const headingClass = "text-2xl font-bold leading-[1.55rem] text-ink";

  return (
    <div className="clear-both bg-white px-2.5 pb-[30px] pt-[25px]">
      <footer className="mx-auto mt-[100px] flex w-full max-w-container flex-col px-[1.3rem] py-6 lg:min-h-[208px] lg:flex-row lg:justify-between">
        <div className="mb-8 flex flex-col justify-between lg:mb-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.logo} alt="BoostMySkills" className="h-14 w-[122px] object-contain lg:m-0" />
        </div>

        {footerColumns.map((column) => {
          const isContact = column.heading === "Get in touch";
          return (
            <div
              key={column.heading || "links"}
              className="m-8 flex flex-wrap justify-center lg:mx-8 lg:my-0 lg:justify-around"
            >
              <div>
                <ul className="m-0 list-none p-0 [&>li:not(:last-child)]:mb-[0.6rem]">
                  {column.heading ? (
                    <li>
                      <h3 className={headingClass}>{column.heading}</h3>
                    </li>
                  ) : null}
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className={linkClass}>
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
                        className="mr-[0.8rem] inline-flex"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={images.linkedin} alt="LinkedIn" className="h-6 w-6" />
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          );
        })}
      </footer>
    </div>
  );
}
