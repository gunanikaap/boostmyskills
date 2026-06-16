import Container from "@/components/layout/Container";
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
      <section className="bg-white pt-9 lg:pt-10">
        <Container className="!max-w-[1120px] lg:!px-0">
          <h1 className="text-4xl font-bold leading-tight text-black sm:text-5xl lg:mb-[3.75rem] lg:text-[4.375rem] lg:leading-[5.25rem]">
            {document.title}
          </h1>
        </Container>
      </section>
      <section className="pb-28 pt-10">
        <Container className="!max-w-[1120px] lg:!px-0 space-y-12 text-[1.25rem] leading-[1.8rem] text-muted">
          {document.sections.map((section, index) => (
            <div key={section.heading ?? `section-${index}`} className="space-y-4">
              {section.heading ? (
                <h2 className="mb-7 mt-12 text-[2.5rem] font-normal leading-[2.5rem] text-primary">
                  {section.heading}
                </h2>
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
