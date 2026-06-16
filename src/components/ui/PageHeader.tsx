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
  // Live content/legal pages place a large black title directly on white.
  return (
    <section className="bg-white pt-12 lg:pt-16">
      <Container>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="mt-3 text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>
        ) : null}
      </Container>
    </section>
  );
}
