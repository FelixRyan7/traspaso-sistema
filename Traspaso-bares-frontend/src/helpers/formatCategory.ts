const CATEGORY_LABELS = {
  alcohol: "alcohol",
  food: "Comida",
  cleaning: "Limpieza",
  supplies: "Suministros",
  soft_drink: "Refrescos",
  beer: "Cerveza",
  wine: "vino",

} as const;

export function formatCategory(category?: string): string {
  if (!category) return "";
  return CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ?? category;
}
