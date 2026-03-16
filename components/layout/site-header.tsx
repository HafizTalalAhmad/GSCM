import Link from "next/link";
import { siteNav } from "@/lib/site-data";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#2f2336]/8 bg-[rgba(255,248,242,0.76)] backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between gap-6">
        <Link className="flex items-center gap-3" href="/">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#231c38] via-[#4e43a5] to-[#f08a68] text-sm font-black text-white">
            GS
          </div>
          <div>
            <div className="font-semibold tracking-wide text-[#221728]">GSCM</div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#7d707f]">Global Social Circle Media</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {siteNav.map((item) => (
            <Link
              key={item.href}
              className="text-sm text-[#7d707f] transition hover:text-[#221728]"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <div className="flex items-center gap-3">
            <Button href="/login" variant="secondary">
              Login
            </Button>
            <Button href="/book-a-call">Book a Call</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
