const formatNumber = (value: number) =>
  new Intl.NumberFormat("es-ES", {
    maximumFractionDigits: 2,
  }).format(value);

export const formatQuantity = (
  quantity: number,
  unit: string
): string => {
  switch (unit) {
    case "ml":
      return quantity >= 500
        ? `${formatNumber(quantity / 1000)} L`
        : `${formatNumber(quantity)} ml`;

    case "g":
      return quantity >= 1000
        ? `${formatNumber(quantity / 1000)} kg`
        : `${formatNumber(quantity)} g`;

    case "l":
      return `${formatNumber(quantity)} L`;

    case "kg":
      return `${formatNumber(quantity)} kg`;

    case "unit":
      return `${formatNumber(quantity)} ud`;

    default:
      return `${formatNumber(quantity)} ${unit}`;
  }
};