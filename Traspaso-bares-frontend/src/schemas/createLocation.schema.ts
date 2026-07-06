import { z } from "zod";

export const locationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Mínimo 2 caracteres")
    .max(50, "maximo 50 caracteres"),

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