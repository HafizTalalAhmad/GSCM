"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import {
  createClientRecord,
  loadPlatformState,
  savePlatformState,
} from "@/components/dashboard/platform-store";
import type { ClientRecord } from "@/lib/platform-types";

const emptyForm = {
  name: "",
  company: "",
  email: "",
  timezone: "",
  notes: "",
};

export function AdminClientsManager() {
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [formValues, setFormValues] = useState(emptyForm);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const state = loadPlatformState();
    setClients(state.clients);
  }, []);

  function updateField(name: keyof typeof formValues, value: string) {
    setFormValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formValues.name || !formValues.company || !formValues.email) {
      setMessage("Name, company, and email are required.");
      return;
    }

    const state = loadPlatformState();
    const nextClient = createClientRecord(formValues);
    const nextState = {
      ...state,
      clients: [nextClient, ...state.clients],
    };

    savePlatformState(nextState);
    setClients(nextState.clients);
    setFormValues(emptyForm);
    setMessage("Client added successfully.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <GlassCard className="rounded-[30px] p-6">
        <div className="text-sm uppercase tracking-[0.28em] text-brand">Client Intake</div>
        <h2 className="mt-3 text-3xl font-semibold text-white">Add a client</h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          Create the client record first. Campaigns can then be assigned to the client email on the campaigns page.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm" placeholder="Client name" value={formValues.name} onChange={(event) => updateField("name", event.target.value)} />
          <input className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm" placeholder="Company" value={formValues.company} onChange={(event) => updateField("company", event.target.value)} />
          <input className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm" placeholder="Client login email" type="email" value={formValues.email} onChange={(event) => updateField("email", event.target.value)} />
          <input className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm" placeholder="Timezone" value={formValues.timezone} onChange={(event) => updateField("timezone", event.target.value)} />
          <textarea className="min-h-[120px] w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm" placeholder="Notes" value={formValues.notes} onChange={(event) => updateField("notes", event.target.value)} />
          {message ? <p className="text-sm text-brand">{message}</p> : null}
          <Button>Add client</Button>
        </form>
      </GlassCard>

      <GlassCard className="rounded-[30px] p-6">
        <div className="text-sm uppercase tracking-[0.28em] text-brand">Client List</div>
        <h2 className="mt-3 text-3xl font-semibold text-white">Saved clients</h2>
        <div className="mt-6 space-y-4">
          {clients.length === 0 ? (
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5 text-sm text-muted">
              No clients added yet.
            </div>
          ) : (
            clients.map((client) => (
              <div key={client.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold text-white">{client.company}</div>
                    <div className="mt-2 text-sm text-muted">{client.name}</div>
                    <div className="mt-1 text-sm text-brand">{client.email}</div>
                  </div>
                  <div className="text-xs uppercase tracking-[0.24em] text-muted">
                    {client.timezone || "No timezone"}
                  </div>
                </div>
                {client.notes ? <p className="mt-4 text-sm leading-7 text-muted">{client.notes}</p> : null}
              </div>
            ))
          )}
        </div>
      </GlassCard>
    </div>
  );
}
