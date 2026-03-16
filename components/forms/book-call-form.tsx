"use client";

import { useActionState } from "react";
import { submitBookingLead, type FormState } from "@/lib/actions/forms";
import { Button } from "@/components/ui/button";

const initialState: FormState = {
  success: false,
  message: "",
};

const fallbackTimezones = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Karachi",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
];

export function BookCallForm() {
  const [state, formAction, isPending] = useActionState(submitBookingLead, initialState);
  const timezoneOptions =
    typeof Intl.supportedValuesOf === "function"
      ? Intl.supportedValuesOf("timeZone")
      : fallbackTimezones;

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
        type="date"
      />
      <select
        className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-muted"
        name="timezone"
        defaultValue=""
      >
        <option value="" disabled>
          Select your timezone
        </option>
        {timezoneOptions.map((timezone) => (
          <option key={timezone} value={timezone}>
            {timezone}
          </option>
        ))}
      </select>
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
