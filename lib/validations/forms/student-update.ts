import { z } from "zod";

export const studentUpdateInputSchema = z.object({
  profile: z
    .object({
      firstName: z.string().trim().optional(),
      lastName: z.string().trim().optional(),
    })
    .optional(),
  studentProfile: z
    .object({
      faculty: z.string().trim().optional(),
      department: z.string().trim().optional(),
      programme: z.string().trim().optional(),
      level: z.string().trim().nullable().optional(),
      gender: z.string().trim().optional(),
      dateOfBirth: z.date().optional(),
      phoneNumber: z.string().trim().optional(),
    })
    .optional(),
});

// Output schema (transforms Date objects to ISO strings)
export const studentUpdateSchema = studentUpdateInputSchema.transform(
  (data) => ({
    ...data,
    studentProfile: data.studentProfile
      ? {
          ...data.studentProfile,
          dateOfBirth: data.studentProfile.dateOfBirth?.toISOString(),
        }
      : undefined,
  }),
);

export type StudentUpdateInputValues = z.infer<typeof studentUpdateInputSchema>;
export type StudentUpdateValues = z.infer<typeof studentUpdateSchema>;
