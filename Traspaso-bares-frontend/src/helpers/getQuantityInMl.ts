import type { LocationProductItem } from "../hooks/orderHooks/useLocationProduct";

export function getQuantityInMl(product: LocationProductItem) {
  return product.quantityUnit === "l"
    ? product.quantity * 1000
    : product.quantity;
}