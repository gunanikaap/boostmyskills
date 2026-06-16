export default function Eyebrow({ children }: { children: string }) {
  return (
    <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
      {children}
    </span>
  );
}
