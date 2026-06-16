export default function Eyebrow({ children }: { children: string }) {
  // Live ".landing-subtitle": brand-green, bold, normal case (not uppercase/tracked).
  return (
    <span className="block text-lg font-bold text-primary sm:text-xl">{children}</span>
  );
}
