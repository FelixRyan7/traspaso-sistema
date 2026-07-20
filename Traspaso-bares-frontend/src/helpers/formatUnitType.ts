const UNIT_TYPE_LABELS = {
  bottle: {
    singular: "botella",
    plural: "botellas",
  },
  can: {
    singular: "lata",
    plural: "latas",
  },
  box: {
    singular: "caja",
    plural: "cajas",
  },
  bag: {
    singular: "bolsa",
    plural: "bolsas",
  },
  bib: {
    singular: "bib",
    plural: "bibs",
  },
  barril: {
    singular: "barril",
    plural: "barriles"
  },
  unit: {
    singular: "unidad",
    plural: "unidades",
  },
} as const;

export function formatUnitType(
  unitType?: string,
  quantity = 1
): string {
  if (!unitType) return "";

  const unit = UNIT_TYPE_LABELS[unitType as keyof typeof UNIT_TYPE_LABELS];

  if (!unit) {
    // Fallback para tipos desconocidos
    return quantity === 1 ? unitType : `${unitType}s`;
  }

  return quantity === 1 ? unit.singular : unit.plural;
}