import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ActivityPanel, CalendarPanel, PerformancePanel, StatGrid } from "@/components/dashboard/dashboard-widgets";
import { clientSidebar } from "@/lib/site-data";

const clientStats = [
  { label: "Pipeline influenced", value: "$142k", detail: "Updated in real time" },
  { label: "Reach growth", value: "+58%", detail: "vs previous quarter" },
  { label: "Approvals pending", value: "12", detail: "Need feedback today" },
  { label: "Invoices status", value: "2 open", detail: "Net 15 terms" },
];

export default function ClientDashboardPage() {
  return (
    <DashboardShell
      title="Client Growth Dashboard"
      subtitle="Monitor campaign progress, review assets, approve content, and keep every deliverable visible across your engagement."
      sidebarItems={clientSidebar}
      accent="brand"
    >
      <StatGrid stats={clientStats} />
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <PerformancePanel />
        <ActivityPanel
          title="Messages"
          items={[
            { name: "Creative review follow-up", meta: "2 new replies from GSCM strategy team" },
            { name: "Billing check-in", meta: "Invoice #2038 due in 4 days" },
            { name: "Launch readiness", meta: "Meta campaign set to go live tomorrow" },
          ]}
        />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <CalendarPanel />
        <ActivityPanel
          title="Asset library"
          items={[
            { name: "Brand video pack", meta: "18 approved assets available for download" },
            { name: "Q2 campaign visuals", meta: "6 files uploaded by creative team" },
            { name: "UGC selects", meta: "Awaiting final client confirmation" },
          ]}
        />
      </div>
    </DashboardShell>
  );
}
