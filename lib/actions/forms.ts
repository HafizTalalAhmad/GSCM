"use server";

import { z } from "zod";

export type FormState = {
  success: boolean;
  message: string;
};

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  company: z.string().min(2, "Please enter your company or brand."),
  projectBrief: z.string().min(10, "Please share a bit more detail."),
});

const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  preferredDate: z.string().min(2, "Please choose a preferred date."),
  timezone: z.string().min(2, "Please enter your timezone."),
  goals: z.string().min(10, "Please tell us more about your goals."),
});

async function deliverSubmission(
  webhookUrl: string | undefined,
  payload: Record<string, string>,
  type: "contact" | "booking",
) {
  if (!webhookUrl) {
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type,
      submittedAt: new Date().toISOString(),
      payload,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Webhook delivery failed.");
  }
}

export async function submitContactPayload(payload: Record<string, string>): Promise<FormState> {
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please check your details and try again.",
    };
  }

  try {
    await deliverSubmission(process.env.LEADS_WEBHOOK_URL, parsed.data, "contact");
    return {
      success: true,
      message: process.env.LEADS_WEBHOOK_URL
        ? "Your inquiry has been sent. We will follow up shortly."
        : "Your inquiry was validated successfully. Add LEADS_WEBHOOK_URL in Vercel to deliver submissions live.",
    };
  } catch {
    return {
      success: false,
      message: "We could not deliver your inquiry right now. Please try again.",
    };
  }
}

export async function submitBookingPayload(payload: Record<string, string>): Promise<FormState> {
  const parsed = bookingSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please check your details and try again.",
    };
  }

  try {
    await deliverSubmission(process.env.BOOKING_WEBHOOK_URL, parsed.data, "booking");
    return {
      success: true,
      message: process.env.BOOKING_WEBHOOK_URL
        ? "Your booking request has been sent. We will confirm the session soon."
        : "Your booking request was validated successfully. Add BOOKING_WEBHOOK_URL in Vercel to deliver submissions live.",
    };
  } catch {
    return {
      success: false,
      message: "We could not deliver your booking request right now. Please try again.",
    };
  }
}

export async function submitContactLead(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  return submitContactPayload({
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    company: String(formData.get("company") || ""),
    projectBrief: String(formData.get("projectBrief") || ""),
  });
}

export async function submitBookingLead(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  return submitBookingPayload({
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    preferredDate: String(formData.get("preferredDate") || ""),
    timezone: String(formData.get("timezone") || ""),
    goals: String(formData.get("goals") || ""),
  });
}
