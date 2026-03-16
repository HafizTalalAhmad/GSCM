import { GlassCard } from "@/components/ui/glass-card";

export function StatGrid({
  stats,
}: {
  stats: Array<{ label: string; value: string; detail: string }>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <GlassCard key={stat.label} className="rounded-[28px]">
          <div className="text-sm text-muted">{stat.label}</div>
          <div className="mt-3 text-4xl font-semibold text-white">{stat.value}</div>
          <div className="mt-3 text-sm text-brand">{stat.detail}</div>
        </GlassCard>
      ))}
    </div>
  );
}

export function PerformancePanel() {
  return (
    <GlassCard className="rounded-[30px] p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted">Performance analytics</div>
          <div className="mt-1 text-2xl font-semibold text-white">Campaign efficiency</div>
        </div>
        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
          +22% CTR
        </div>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
          <div className="mb-5 flex items-center justify-between">
            <div className="text-sm text-muted">Weekly movement</div>
            <div className="text-sm text-white">Last 12 weeks</div>
          </div>
          <div className="h-56 rounded-[24px] bg-[linear-gradient(180deg,rgba(105,226,255,0.18),transparent),linear-gradient(90deg,rgba(105,226,255,0.8),rgba(139,92,246,0.7),rgba(255,143,112,0.9))] opacity-90 [clip-path:polygon(0%_88%,10%_74%,24%_76%,39%_52%,52%_61%,66%_37%,79%_41%,90%_12%,100%_0%,100%_100%,0%_100%)]" />
        </div>
        <div className="space-y-4">
          {[
            ["ROAS", "4.2x"],
            ["Cost per lead", "$19.40"],
            ["Content completion", "92%"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
              <div className="text-sm text-muted">{label}</div>
              <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

export function CalendarPanel() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <GlassCard className="rounded-[30px] p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted">Content calendar</div>
          <div className="mt-1 text-2xl font-semibold text-white">Upcoming approvals</div>
        </div>
        <div className="text-sm text-brand">May 2026</div>
      </div>
      <div className="mt-6 grid grid-cols-7 gap-3 text-center text-xs uppercase tracking-[0.24em] text-muted">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-7 gap-3">
        {Array.from({ length: 28 }).map((_, index) => {
          const active = [4, 9, 12, 16, 21, 25].includes(index);
          return (
            <div
              key={index}
              className={`rounded-2xl border p-3 text-sm ${
                active
                  ? "border-brand/30 bg-brand/10 text-white"
                  : "border-white/8 bg-white/[0.03] text-muted"
              }`}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

export function ActivityPanel({
  title,
  items,
}: {
  title: string;
  items: Array<{ name: string; meta: string }>;
}) {
  return (
    <GlassCard className="rounded-[30px] p-6">
      <div className="text-2xl font-semibold text-white">{title}</div>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.name} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
            <div className="font-medium text-white">{item.name}</div>
            <div className="mt-2 text-sm text-muted">{item.meta}</div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
