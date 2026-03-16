import { GlassCard } from "@/components/ui/glass-card";

export function DatabaseNotice({ message }: { message: string }) {
  return (
    <GlassCard className="rounded-[26px] border-amber-400/20 bg-amber-400/10 p-5">
      <div className="text-sm uppercase tracking-[0.24em] text-amber-200">Database status</div>
      <p className="mt-3 text-sm leading-7 text-amber-100/90">{message}</p>
    </GlassCard>
  );
}
