import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ActivityPanel, PerformancePanel, StatGrid } from "@/components/dashboard/dashboard-widgets";
import { adminSidebar } from "@/lib/site-data";
import { GlassCard } from "@/components/ui/glass-card";

const adminStats = [
  { label: "Active clients", value: "24", detail: "6 in onboarding" },
  { label: "Open leads", value: "83", detail: "14 warm this week" },
  { label: "Campaigns live", value: "39", detail: "Across 11 markets" },
  { label: "MRR under management", value: "$118k", detail: "Retainers + projects" },
];

export default function AdminDashboardPage() {
  return (
    <DashboardShell
      title="Admin Command Center"
      subtitle="Run service delivery, monitor lead flow, manage content publishing, and coordinate campaign operations from one premium control layer."
      sidebarItems={adminSidebar}
      accent="coral"
    >
      <StatGrid stats={adminStats} />
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <PerformancePanel />
        <ActivityPanel
          title="Lead pipeline"
          items={[
            { name: "Enterprise SaaS inbound", meta: "Qualified lead, $9k potential retainer" },
            { name: "Personal brand inquiry", meta: "Discovery call scheduled for Tuesday" },
            { name: "Ecommerce relaunch", meta: "Proposal sent, awaiting signature" },
          ]}
        />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <GlassCard className="rounded-[30px] p-6">
          <div className="text-2xl font-semibold text-white">Editorial management</div>
          <div className="mt-6 space-y-4">
            {[
              ["Blog posts", "8 scheduled, 3 drafts in review"],
              ["Case studies", "2 awaiting client sign-off"],
              ["Testimonials", "5 new submissions tagged for proofing"],
              ["Services", "Pricing block needs Q3 update"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                <div className="font-medium text-white">{label}</div>
                <div className="mt-2 text-sm text-muted">{value}</div>
              </div>
            ))}
          </div>
        </GlassCard>
        <ActivityPanel
          title="Operations feed"
          items={[
            { name: "Client handoff", meta: "Atlas Growth moved to monthly reporting phase" },
            { name: "Contact submissions", meta: "11 new inbound forms since Friday" },
            { name: "Platform settings", meta: "Workspace permissions updated for 3 team members" },
          ]}
        />
      </div>
    </DashboardShell>
  );
}
