import Container from "@/components/layout/Container";
import Eyebrow from "@/components/ui/Eyebrow";
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
  return (
    <section className="bg-surface">
      <Container className="py-14 lg:py-20">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="mt-3 text-4xl font-bold leading-tight text-ink sm:text-5xl">{title}</h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{description}</p>
        ) : null}
      </Container>
    </section>
  );
}
