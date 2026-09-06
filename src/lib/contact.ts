import { z } from "zod";

/**
 * Shared contact-form contract.
 *
 * The same schema validates in the browser and on the server. Client-side
 * validation is a convenience; the server validates independently and never
 * trusts what arrives.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is unusually long — please shorten it."),
  email: z.email("Please enter a valid email address.").max(160),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Please add a little more detail — at least 20 characters.")
    .max(4000, "Please keep the message under 4000 characters."),
  /**
   * Honeypot. Real users never fill this; bots reliably do.
   *
   * Deliberately permissive: rejecting it here would return a validation error
   * naming the field, which tells a bot exactly what tripped it. The route
   * accepts the request and silently discards it instead.
   */
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };
