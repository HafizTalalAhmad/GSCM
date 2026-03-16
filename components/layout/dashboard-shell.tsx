"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/actions/auth";
import type { ReactNode } from "react";

export function DashboardShell({
  title,
  subtitle,
  sidebarItems,
  accent,
  children,
}: {
  title: string;
  subtitle: string;
  sidebarItems: Array<{ label: string; href: string }>;
  accent: "brand" | "coral";
  children: ReactNode;
}) {
  const pathname = usePathname();
  const accentClass =
    accent === "brand"
      ? "from-brand/30 via-brand/5 to-transparent"
      : "from-coral/30 via-accent/10 to-transparent";

  return (
    <div className="min-h-screen bg-deep text-white">
      <div className="container-shell grid gap-6 py-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="glass-panel rounded-[28px] p-5">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-sm font-black">
              GS
            </div>
            <div>
              <div className="font-semibold">GSCM Platform</div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted">Workspace</div>
            </div>
          </div>
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-2xl px-4 py-3 text-sm transition",
                  pathname === item.href
                    ? "bg-white/10 text-white"
                    : "text-muted hover:bg-white/5 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <GlassCard className="mt-8 p-5">
            <div className="flex items-center gap-3 text-sm text-muted">
              <Sparkles className="h-4 w-4 text-brand" />
              AI Growth Assistant
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              Surface campaign blockers, approval bottlenecks, and content opportunities in one place.
            </p>
          </GlassCard>
        </aside>

        <main className="space-y-6">
          <div className={cn("glass-panel relative overflow-hidden rounded-[30px] p-6 sm:p-8", `bg-gradient-to-br ${accentClass}`)}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_24%)]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-[0.3em] text-brand">Live Workspace</div>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-200/75 sm:text-base">{subtitle}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-muted">
                  <Search className="h-4 w-4" />
                  Search projects
                </div>
                <form action={logoutAction}>
                  <button className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-muted transition hover:text-white">
                    Logout
                  </button>
                </form>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <Bell className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
