const { z } = require("zod");
const sanitizeHtml = require("sanitize-html");

const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .max(30, "Máximo 30 caracteres")
    .transform((value) =>
      sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
      }).trim()
    ),

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

  quantity: z.number().min(0, "La cantidad debe ser mayor o igual a 0"),

  quantityUnit: z.enum([
    "ml",
    "l",
    "g",
    "kg",
    "unit",
  ]),

  suggestedQuantity: z
    .number()
    .min(1, "La cantidad sugerida debe ser al menos 1"),

  locations: z
    .array(z.number())
    .min(1, "Debes seleccionar al menos una ubicación"),
});

module.exports = productSchema;