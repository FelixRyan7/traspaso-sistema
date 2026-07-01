import { useState, useCallback } from "react";
import type { LocationProductItem } from "../../hooks/orderHooks/useLocationProduct";
import { getQuickAmounts } from "../../helpers/getQuickAmounts";
import { Button } from "../ui/Buttons/Button";

type Props = {
  product: LocationProductItem;
  onAdd: (product: LocationProductItem, quantity: number) => void;
  showTick?: boolean;
  addedQuantity?: number;
};


const clamp = (v: number) => Math.max(1, v);

export default function LocationProductCard({
  product,
  onAdd,
  showTick = false,
  addedQuantity
}: Props) {

  const quickAmounts = getQuickAmounts(product);
  
  const initialQty =
      product.companyProduct?.suggestedQuantity ??
      getQuickAmounts(product)[0];
  
  const [qty, setQty] = useState(initialQty);

  const inc = useCallback(() => setQty((q) => q + 1), []);
  const dec = useCallback(() => setQty((q) => clamp(q - 1)), []);

  const add = useCallback(
    () => onAdd(product, qty),
    [onAdd, product, qty]
  );

  return (
    <div className="bg-white-soft border border-gray-light rounded-2xl p-4 shadow-sm">

      {/* HEADER */}
      <div>
        {(addedQuantity ?? 0) > 0 && (
          <div className="text-xs text-primary font-medium">
            En lista: <span className="font-semibold">{addedQuantity}</span>
          </div>
        )}
        <h3 className="font-semibold text-dark truncate">
          {product.name}
        </h3>
        <p className="text-xs text-gray mt-1">
          {product.unitType} · {product.quantity} {product.quantityUnit}
        </p>
      </div>

      {/* QUICK AMOUNTS */}
      <div className="mt-4 flex gap-3 md:gap-5 overflow-x-auto pb-1">
        {quickAmounts.map((n) => (
          <button
            key={n}
            onClick={() => setQty(n)}
            className={`
              px-3 py-2 rounded-full text-xs font-medium border whitespace-nowrap
              ${
                qty === n
                  ? "bg-primary text-white-soft border-primary"
                  : "bg-white-soft border-gray-light"
              }
            `}
          >
            {n}
          </button>
        ))}
      </div>

      {/* CONTROL BAR */}
      <div className="mt-4 flex gap-3 items-center justify-between">

        {/* STEPPER */}
        <div className="w-1/2 flex items-center justify-between border border-gray-light rounded-xl h-12">
          <button onClick={dec} className="w-12 h-full text-lg">
            −
          </button>

          <span className="font-semibold">{qty}</span>

          <button onClick={inc} className="w-12 h-full text-lg">
            +
          </button>
        </div>

        {/* CTA */}
        <Button
          onClick={add}
          className="
            h-12 w-36
            bg-primary text-white-soft
            rounded-xl
            font-semibold
            active:scale-95
            transition
          "
        >
          {showTick ? "✓" : "Añadir"}
        </Button>

      </div>
    </div>
  );
}