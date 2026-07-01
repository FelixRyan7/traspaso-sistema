import { z } from "zod";

export const locationSchema = z.object({
  name: z
    .string()
    .min(2, "Mínimo 2 caracteres"),

  type: z.enum([
    "bar",
    "restaurant",
    "storage",
    "kitchen",
    "rooftop",
    "beach_bar",
    "other",
  ]),
});

export type LocationFormData = z.infer<
  typeof locationSchema
>;