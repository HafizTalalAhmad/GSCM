"use client";

import { useActionState } from "react";
import { loginAction, type AuthState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

const initialState: AuthState = {
  success: false,
  message: "",
};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input
        className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-muted"
        name="email"
        placeholder="Email address"
        type="email"
      />
      <input
        className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-muted"
        name="password"
        placeholder="Password"
        type="password"
      />
      {state.message ? <p className="text-sm text-rose-300">{state.message}</p> : null}
      <Button className="w-full">{isPending ? "Signing in..." : "Sign in"}</Button>
    </form>
  );
}
