"use client";

import { useState, useTransition } from "react";
import { submitBookingPayload, type FormState } from "@/lib/actions/forms";
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
  const [state, setState] = useState<FormState>(initialState);
  const [isPending, startTransition] = useTransition();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    preferredDate: "",
    timezone: "",
    goals: "",
  });

  const timezoneOptions =
    typeof Intl.supportedValuesOf === "function"
      ? Intl.supportedValuesOf("timeZone")
      : fallbackTimezones;

  function updateField(name: keyof typeof formValues, value: string) {
    setFormValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      const result = await submitBookingPayload(formValues);
      setState(result);

      if (result.success) {
        setFormValues({
          name: "",
          email: "",
          preferredDate: "",
          timezone: "",
          goals: "",
        });
      }
    });
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <input
        className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-muted"
        name="name"
        placeholder="Your name"
        value={formValues.name}
        onChange={(event) => updateField("name", event.target.value)}
      />
      <input
        className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-muted"
        name="email"
        placeholder="Email address"
        type="email"
        value={formValues.email}
        onChange={(event) => updateField("email", event.target.value)}
      />
      <input
        className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-muted"
        name="preferredDate"
        type="date"
        value={formValues.preferredDate}
        onChange={(event) => updateField("preferredDate", event.target.value)}
      />
      <select
        className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none"
        name="timezone"
        value={formValues.timezone}
        onChange={(event) => updateField("timezone", event.target.value)}
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
        value={formValues.goals}
        onChange={(event) => updateField("goals", event.target.value)}
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
