
import { z } from "zod";

export const editCompanyProductSchema = z.object({
  suggestedQuantity: z
    .number()
    .min(1, "La cantidad sugerida debe ser al menos 1")
    .nullable(),

  inventoryUnit: z
    .enum(["unit", "kg", "g", "l", "ml"])
    .nullable(),

  operationalArea: z.enum(["bar", "kitchen"]),
});

export type EditCompanyProductFormData = z.infer<
  typeof editCompanyProductSchema
>;

