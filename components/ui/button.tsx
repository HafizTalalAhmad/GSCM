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
    "bg-gradient-to-r from-[#281a27] via-[#5a415d] to-[#b88462] text-white shadow-soft hover:scale-[1.01]",
  secondary:
    "border border-[#4a342e]/12 bg-white/70 text-[#24131f] hover:bg-white/90",
  ghost:
    "text-[#746770] hover:text-[#24131f]",
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
