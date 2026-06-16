import Container from "@/components/layout/Container";
import { type ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
}) {
  // Live content/legal pages place a large black title directly on white.
  const isCatalogue = Boolean(eyebrow);
  const sectionTop = isCatalogue ? "lg:pt-[30px]" : "lg:pt-[38px]";
  const containerWidth = isCatalogue ? "!max-w-[1100px]" : "!max-w-[1120px]";
  const titleClass = isCatalogue
    ? "mt-8 text-[2.5rem] font-semibold leading-[2.5rem] tracking-[-1.16px] text-ink sm:text-[3.5rem] sm:leading-[3.5rem] lg:text-[4rem] lg:leading-[2.5rem]"
    : "mt-0 text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-[4.375rem] lg:leading-[5.25rem]";

  return (
    <section className={`bg-white pt-9 ${sectionTop}`}>
      <Container className={`${containerWidth} lg:!px-0`}>
        {eyebrow ? (
          <span className="block text-2xl font-semibold leading-[30px] text-primary">
            {eyebrow}
          </span>
        ) : null}
        <h1 className={titleClass}>
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>
        ) : null}
      </Container>
    </section>
  );
}
