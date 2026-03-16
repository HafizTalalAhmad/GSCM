import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "bg-gradient-to-r from-brand via-sky-300 to-coral text-slate-950 shadow-soft hover:scale-[1.01]",
  secondary:
    "border border-white/12 bg-white/6 text-white hover:bg-white/10",
  ghost:
    "text-muted hover:text-white",
};

export function Button({
  href,
  children,
  className,
  variant = "primary",
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-wide transition duration-200",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
