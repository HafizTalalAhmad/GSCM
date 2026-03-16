"use client";

import { useActionState } from "react";
import { submitBookingLead, type FormState } from "@/lib/actions/forms";
import { Button } from "@/components/ui/button";

const initialState: FormState = {
  success: false,
  message: "",
};

export function BookCallForm() {
  const [state, formAction, isPending] = useActionState(submitBookingLead, initialState);

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
        name="preferredDate"
        placeholder="Preferred date or week"
      />
      <input
        className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-muted"
        name="timezone"
        placeholder="Timezone"
      />
      <textarea
        className="min-h-[150px] w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-muted"
        name="goals"
        placeholder="Share your brand, goals, and what you want this call to help unlock."
      />
      {state.message ? (
        <p className={state.success ? "text-sm text-emerald-300" : "text-sm text-rose-300"}>
          {state.message}
        </p>
      ) : null}
      <Button className="w-full sm:w-auto">{isPending ? "Submitting..." : "Request booking"}</Button>
    </form>
  );
}
