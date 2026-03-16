import Link from "next/link";
import { siteNav } from "@/lib/site-data";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#4a342e]/8 bg-[rgba(252,247,241,0.74)] backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between gap-6">
        <Link className="flex items-center gap-3" href="/">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#281a27] via-[#5a415d] to-[#b88462] text-sm font-black text-white">
            GS
          </div>
          <div>
            <div className="font-semibold tracking-wide text-[#231520]">GSCM</div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#7d736f]">Global Social Circle Media</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {siteNav.map((item) => (
            <Link
              key={item.href}
              className="text-sm text-[#7d736f] transition hover:text-[#231520]"
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
