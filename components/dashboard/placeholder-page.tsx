import { DashboardShell } from "@/components/layout/dashboard-shell";
import { GlassCard } from "@/components/ui/glass-card";

export function DashboardPlaceholderPage({
  title,
  subtitle,
  sidebarItems,
  accent,
}: {
  title: string;
  subtitle: string;
  sidebarItems: Array<{ label: string; href: string }>;
  accent: "brand" | "coral";
}) {
  return (
    <DashboardShell title={title} subtitle={subtitle} sidebarItems={sidebarItems} accent={accent}>
      <GlassCard className="rounded-[30px] p-8">
        <div className="max-w-3xl space-y-4">
          <div className="text-sm uppercase tracking-[0.28em] text-brand">Module Scaffold</div>
          <h2 className="text-3xl font-semibold text-white">{title}</h2>
          <p className="text-base leading-8 text-muted">{subtitle}</p>
        </div>
      </GlassCard>
    </DashboardShell>
  );
}
