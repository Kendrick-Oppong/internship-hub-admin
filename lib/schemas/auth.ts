import * as z from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Identifier is required")
    .max(100, "Identifier is too long"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type LoginValues = z.infer<typeof loginSchema>;
