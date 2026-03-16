import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="section-space">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading
          eyebrow="Dashboard Access"
          title="Sign in to the GSCM workspace."
          description="Use your client or admin credentials to access the protected dashboards."
        />
        <GlassCard className="rounded-[32px]">
          <div className="space-y-6">
            <div className="text-sm leading-7 text-muted">
              Credentials are controlled through environment variables so the repo stays deployment-ready and secrets stay out of source control.
            </div>
            <LoginForm />
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
