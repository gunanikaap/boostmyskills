import Container from "@/components/layout/Container";
import PageHeader from "@/components/ui/PageHeader";
import type { LegalDocument, LegalBlock } from "@/data/legal";

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "list") {
    return (
      <ul className="list-disc space-y-2 pl-5 marker:text-primary">
        {block.items?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
  return (
    <p>
      {block.label ? <strong className="text-ink">{block.label}</strong> : null}
      {block.label && block.text ? " " : null}
      {block.text}
    </p>
  );
}

export default function LegalShell({ document }: { document: LegalDocument }) {
  return (
    <>
      <PageHeader title={document.title} />
      <section className="py-12 lg:py-16">
        <Container className="max-w-4xl space-y-8 text-lg leading-relaxed text-muted">
          {document.sections.map((section, index) => (
            <div key={section.heading ?? `section-${index}`} className="space-y-4">
              {section.heading ? (
                // Live ".r4c-privacy-subtitle": brand green, large.
                <h2 className="text-2xl font-semibold text-primary sm:text-3xl">{section.heading}</h2>
              ) : null}
              {section.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
