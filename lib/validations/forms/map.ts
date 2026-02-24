import z from "zod";
import { MIN_ZONE_POINTS } from "@/lib/constants/map";

export const zoneSchema = z.object({
  name: z.string().min(1, "Name is required"),
  color: z.string().min(1, "Color is required"),
  transparency: z.number().min(0).max(1),
  borderWidth: z.number().min(1).max(10),
  description: z
    .string()
    .max(500, "Description must be 500 characters or less")
    .optional(),
  coordinates: z
    .array(z.tuple([z.number(), z.number()]))
    .min(
      MIN_ZONE_POINTS,
      `At least ${MIN_ZONE_POINTS} coordinates are required`
    ),
});

export type ZoneFormData = z.infer<typeof zoneSchema>;
