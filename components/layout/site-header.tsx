import Link from "next/link";
import { siteNav } from "@/lib/site-data";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-deep/70 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between gap-6">
        <Link className="flex items-center gap-3" href="/">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-accent text-sm font-black text-slate-950">
            GS
          </div>
          <div>
            <div className="font-semibold tracking-wide text-white">GSCM</div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted">Global Social Circle Media</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {siteNav.map((item) => (
            <Link
              key={item.href}
              className="text-sm text-muted transition hover:text-white"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/book-a-call">Book a Call</Button>
        </div>
      </div>
    </header>
  );
}
