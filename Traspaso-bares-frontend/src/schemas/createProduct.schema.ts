import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),

  category: z.enum([
    "alcohol",
    "soft_drink",
    "beer",
    "wine",
    "food",
    "supplies",
    "other",
  ]),

  subcategory: z.enum([
    "vodka",
    "gin",
    "rum",
    "whisky",
    "tequila",
    "aperitif",
    "liqueur",
    "beer",
    "water",
    "juice",
    "soda",
    "energy_drink",
    "coffee",
    "cleaning",
    "fruit",
    "ice",
    "other",
  ]),

  unitType: z.enum([
    "can",
    "bottle",
    "box",
    "bag",
    "unit",
    "barril",
    "bib",
  ]),

  quantity: z.number().min(0, "Debe ser mayor que 0"),

  quantityUnit: z.enum(["ml", "l", "g", "kg", "unit"]),

  suggestedQuantity: z.number().min(1),

  locations: z.array(z.number()).min(1),
});

export type ProductFormData = z.infer<typeof productSchema>;