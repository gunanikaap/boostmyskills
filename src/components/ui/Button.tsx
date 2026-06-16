import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "outline" | "light";

const styles: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  outline: "border border-primary text-primary hover:bg-primary hover:text-white",
  light: "bg-white text-ink border border-line hover:border-primary hover:text-primary",
};

export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const classes = `${base} ${styles[variant]} ${className}`;

  // Links that leave the site (auth, enrolment, partner pages) open a real anchor.
  const isExternal = external || href.startsWith("http");
  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
