import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerStudentSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain uppercase, lowercase, number and special character"
    ),
});

export const verifyEmailSchema = z.object({
  email: z.string(),
  code: z.string().min(6, "Code must be 6 characters"),
});

export const resendVerificationSchema = z.object({
  email: z.email(),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterStudentValues = z.infer<typeof registerStudentSchema>;
export type VerifyEmailValues = z.infer<typeof verifyEmailSchema>;
export type ResendVerificationValues = z.infer<typeof resendVerificationSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
