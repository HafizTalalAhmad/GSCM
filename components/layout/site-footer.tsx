import Link from "next/link";
import { siteNav } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#4a342e]/8 py-10">
      <div className="container-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="text-2xl font-semibold text-[#231520]">Global Social Circle Media</div>
          <p className="max-w-xl text-sm leading-7 text-[#746770]">
            Premium growth systems for brands that want sharper positioning, better campaign visibility, and a more polished social presence.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-[#746770]">
          {siteNav.map((item) => (
            <Link key={item.href} className="transition hover:text-[#231520]" href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
