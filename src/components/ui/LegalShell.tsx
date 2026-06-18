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
  if (block.type === "group") {
    // Live cookie entity block: bold name + detail lines, tight (line-height
    // only); the surrounding space-y separates groups from each other.
    return (
      <div>
        {block.label ? <p className="font-bold text-ink">{block.label}</p> : null}
        {block.items?.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
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
      <section className="pb-28">
        {/* Live: title margin-bottom 3.75rem, subtitle margin 3rem 0 (1.875rem
            below on desktop). Sections are separated by space-y-12 (3rem); the
            heading itself carries no extra top margin. */}
        {/* Live .r4c-privacy-content: 1.1rem/1.7rem mobile, 1.25rem/1.8rem desktop. */}
        <Container className="!max-w-[1120px] lg:!px-0 space-y-12 text-[1.1rem] leading-[1.7rem] text-muted lg:text-[1.25rem] lg:leading-[1.8rem]">
          {document.sections.map((section, index) => (
            // Live legal content: ~1.8rem gap between paragraphs.
            <div key={section.heading ?? `section-${index}`} className="space-y-7">
              {section.heading ? (
                <h2 className="mb-[1.875rem] text-[2.5rem] font-normal leading-[2.5rem] text-primary">
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
