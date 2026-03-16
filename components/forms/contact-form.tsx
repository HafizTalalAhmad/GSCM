"use client";

import { useState, useTransition } from "react";
import { submitContactPayload, type FormState } from "@/lib/actions/forms";
import { Button } from "@/components/ui/button";

const initialState: FormState = {
  success: false,
  message: "",
};

export function ContactForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [isPending, startTransition] = useTransition();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    company: "",
    projectBrief: "",
  });

  function updateField(name: keyof typeof formValues, value: string) {
    setFormValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      const result = await submitContactPayload(formValues);
      setState(result);

      if (result.success) {
        setFormValues({
          name: "",
          email: "",
          company: "",
          projectBrief: "",
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
        name="company"
        placeholder="Company or brand"
        value={formValues.company}
        onChange={(event) => updateField("company", event.target.value)}
      />
      <textarea
        className="min-h-[150px] w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-muted"
        name="projectBrief"
        placeholder="Tell us about your growth goals, current blockers, and what support you need."
        value={formValues.projectBrief}
        onChange={(event) => updateField("projectBrief", event.target.value)}
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
