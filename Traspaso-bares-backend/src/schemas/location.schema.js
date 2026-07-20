const { z } = require("zod");
const sanitizeHtml = require("sanitize-html");

const locationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres")
    .transform((value) =>
      sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
      }).trim()
    ),

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

module.exports = locationSchema;