"use client";

import { useActionState } from "react";
import { submitContactLead, type FormState } from "@/lib/actions/forms";
import { Button } from "@/components/ui/button";

const initialState: FormState = {
  success: false,
  message: "",
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactLead, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input
        className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-muted"
        name="name"
        placeholder="Your name"
      />
      <input
        className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-muted"
        name="email"
        placeholder="Email address"
        type="email"
      />
      <input
        className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-muted"
        name="company"
        placeholder="Company or brand"
      />
      <textarea
        className="min-h-[150px] w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-muted"
        name="projectBrief"
        placeholder="Tell us about your growth goals, current blockers, and what support you need."
      />
      {state.message ? (
        <p className={state.success ? "text-sm text-emerald-300" : "text-sm text-rose-300"}>
          {state.message}
        </p>
      ) : null}
      <Button className="w-full sm:w-auto">{isPending ? "Sending..." : "Send inquiry"}</Button>
    </form>
  );
}
