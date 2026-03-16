import { ArrowRight, CheckCircle2 } from "lucide-react";
import { blogPosts, caseStudies, expertise, faqs, metrics, pricingTiers, services, testimonials } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionFade } from "@/components/ui/motion-fade";
import { SectionHeading } from "@/components/ui/section-heading";

export function TrustedBySection() {
  const brands = ["Luma", "Novora", "Crest", "Velora", "Axis", "Mira"];
  return (
    <section className="section-space pt-4">
      <div className="container-shell">
        <MotionFade className="space-y-6">
          <p className="text-center text-xs uppercase tracking-[0.32em] text-muted">
            Trusted by founders, operators, and growth teams
          </p>
          <div className="grid grid-cols-2 gap-4 rounded-[32px] border border-[#2f2336]/8 bg-white/60 p-6 sm:grid-cols-3 lg:grid-cols-6">
            {brands.map((brand) => (
              <div key={brand} className="rounded-2xl border border-[#2f2336]/8 bg-white/70 px-5 py-4 text-center text-lg font-medium text-[#35253f]">
                {brand}
              </div>
            ))}
          </div>
        </MotionFade>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="section-space">
      <div className="container-shell space-y-12">
        <SectionHeading
          eyebrow="Services"
          title="A premium delivery stack built for modern social growth."
          description="We combine strategic rigor, campaign visibility, and design-led execution so marketing feels less chaotic and more compounding."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <MotionFade key={service.title} delay={index * 0.08}>
              <GlassCard className="h-full rounded-[30px] bg-white/70">
                <div className="space-y-4">
                  <div className="text-sm uppercase tracking-[0.28em] text-[#b2513f]">0{index + 1}</div>
                  <h3 className="text-2xl font-semibold text-[#24172f]">{service.title}</h3>
                  <p className="text-sm leading-7 text-[#6f6478]">{service.description}</p>
                </div>
              </GlassCard>
            </MotionFade>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExpertiseSection() {
  return (
    <section className="section-space">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <MotionFade>
          <SectionHeading
            eyebrow="Platform Expertise"
            title="Agency strategy backed by a workspace your clients actually enjoy using."
            description="From approvals and reports to assets and invoices, the GSCM platform brings premium service delivery into one elegant system."
          />
        </MotionFade>
        <MotionFade delay={0.1}>
          <div className="grid gap-4 sm:grid-cols-2">
            {expertise.map((item) => (
              <GlassCard key={item} className="rounded-[28px]">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium text-[#24172f]">{item}</div>
                  <CheckCircle2 className="h-5 w-5 text-[#b2513f]" />
                </div>
              </GlassCard>
            ))}
          </div>
        </MotionFade>
      </div>
    </section>
  );
}

export function WhyChooseUsSection() {
  const points = [
    "SaaS-style transparency for campaigns, assets, approvals, and analytics",
    "Premium art direction with performance-minded content systems",
    "Cross-functional support across paid, organic, ops, and reporting",
  ];

  return (
    <section className="section-space">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <MotionFade>
          <SectionHeading eyebrow="Why Choose Us" title="The polish of a premium studio with the accountability of a growth platform." />
        </MotionFade>
        <MotionFade delay={0.1}>
          <GlassCard className="rounded-[34px] p-7">
            <div className="space-y-5">
              {points.map((point) => (
                <div key={point} className="flex gap-4 rounded-3xl border border-white/8 bg-white/[0.03] p-5">
                  <div className="mt-1 h-3 w-3 rounded-full bg-gradient-to-r from-brand to-coral" />
                  <p className="text-sm leading-7 text-[#6f6478]">{point}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </MotionFade>
      </div>
    </section>
  );
}

export function CaseStudiesSection() {
  return (
    <section className="section-space">
      <div className="container-shell space-y-12">
        <SectionHeading eyebrow="Case Studies" title="Selected growth stories across categories, markets, and campaign stages." />
        <div className="grid gap-5 lg:grid-cols-3">
          {caseStudies.map((item, index) => (
            <MotionFade key={item.title} delay={index * 0.08}>
              <GlassCard className="rounded-[30px]">
                <div className="space-y-5">
                  <div className="text-xs uppercase tracking-[0.28em] text-[#8f7d86]">{item.category}</div>
                  <h3 className="text-2xl font-semibold text-[#24172f]">{item.title}</h3>
                  <div className="flex items-center justify-between rounded-2xl border border-[#2f2336]/8 bg-white/70 px-4 py-3">
                    <span className="text-sm text-[#6f6478]">Headline result</span>
                    <span className="text-sm font-semibold text-[#b2513f]">{item.result}</span>
                  </div>
                </div>
              </GlassCard>
            </MotionFade>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MetricsSection() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <GlassCard className="rounded-[34px] p-8 sm:p-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
                <div className="text-4xl font-semibold text-[#24172f]">{metric.value}</div>
                <div className="mt-3 text-sm text-[#6f6478]">{metric.label}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section-space">
      <div className="container-shell space-y-12">
        <SectionHeading eyebrow="Testimonials" title="Partners come to GSCM for growth, and stay for the clarity." />
        <div className="grid gap-5 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <MotionFade key={testimonial.author} delay={index * 0.08}>
              <GlassCard className="rounded-[30px]">
                <p className="text-xl leading-9 text-[#24172f]">{testimonial.quote}</p>
                <div className="mt-8">
                  <div className="font-medium text-[#24172f]">{testimonial.author}</div>
                  <div className="text-sm text-[#6f6478]">{testimonial.role}</div>
                </div>
              </GlassCard>
            </MotionFade>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingPreviewSection() {
  return (
    <section className="section-space">
      <div className="container-shell space-y-12">
        <SectionHeading eyebrow="Pricing Preview" title="Simple retainers for brands that want serious delivery." />
        <div className="grid gap-5 xl:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <MotionFade key={tier.name} delay={index * 0.08}>
              <GlassCard className="h-full rounded-[30px]">
                <div className="space-y-6">
                  <div>
                    <div className="text-sm uppercase tracking-[0.26em] text-[#8f7d86]">{tier.name}</div>
                    <div className="mt-4 text-4xl font-semibold text-[#24172f]">
                      {tier.price}
                      <span className="text-base text-[#6f6478]">{tier.period}</span>
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-[#6f6478]">{tier.description}</p>
                  <div className="space-y-3">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 text-sm text-[#35253f]">
                        <CheckCircle2 className="h-4 w-4 text-[#b2513f]" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </MotionFade>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BlogPreviewSection() {
  return (
    <section className="section-space">
      <div className="container-shell space-y-12">
        <SectionHeading eyebrow="Blog Preview" title="Thoughtful content on creative systems, paid growth, and premium brand execution." />
        <div className="grid gap-5 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <MotionFade key={post.title} delay={index * 0.08}>
              <GlassCard className="h-full rounded-[30px]">
                <div className="space-y-6">
                  <div className="text-xs uppercase tracking-[0.28em] text-[#8f7d86]">{post.category}</div>
                  <h3 className="text-2xl font-semibold text-[#24172f]">{post.title}</h3>
                  <div className="flex items-center justify-between text-sm text-[#6f6478]">
                    <span>{post.readTime}</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </GlassCard>
            </MotionFade>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqPreviewSection() {
  return (
    <section className="section-space">
      <div className="container-shell space-y-12">
        <SectionHeading eyebrow="FAQ Preview" title="Clear answers before the onboarding call." />
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <MotionFade key={faq.question} delay={index * 0.06}>
              <GlassCard className="rounded-[28px]">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-[#24172f]">{faq.question}</h3>
                  <p className="text-sm leading-7 text-[#6f6478]">{faq.answer}</p>
                </div>
              </GlassCard>
            </MotionFade>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  return (
    <section className="section-space pt-8">
      <div className="container-shell">
        <GlassCard className="rounded-[36px] bg-gradient-to-br from-[#fffdfb] via-[#fff7f0] to-[#ffe5da] px-8 py-10 sm:px-10 sm:py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="text-xs uppercase tracking-[0.3em] text-[#b2513f]">Final CTA</div>
              <h2 className="text-4xl font-semibold tracking-tight text-[#24172f] sm:text-5xl">
                Ready to upgrade from scattered marketing to a premium growth machine?
              </h2>
              <p className="text-base leading-8 text-[#6f6478]">
                Let&apos;s design the strategy, creative system, and reporting workflow your brand actually deserves.
              </p>
            </div>
            <Button href="/book-a-call" className="min-w-[180px]">
              Book a Call
            </Button>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
