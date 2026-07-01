import type { LocationProductItem } from "../hooks/orderHooks/useLocationProduct";

export function getQuickAmounts(product: LocationProductItem) {
  const { unitType, quantity, quantityUnit } = product;

  // CAN
  if (unitType === "can") {
    return [6, 12, 24];
  }

  // BOX
  if (unitType === "box") {
    return [1, 2, 5];
  }

  // BOTTLE → aquí usas quantity real
  if (unitType === "bottle") {
    const ml =
      quantityUnit === "l" ? quantity * 1000 : quantity;

    if (ml >= 500) {
      return [1, 3, 6, 12]; // botella grande
    }

    return [6, 12, 18]; // botella pequeña
  }

  // fallback
  return [1, 2, 5];
}