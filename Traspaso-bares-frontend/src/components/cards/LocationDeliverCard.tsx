import { useState } from "react";
import type { LocationProductItem } from "../../hooks/orderHooks/useLocationProduct";
import { getQuickAmounts } from "../../helpers/getQuickAmounts";


type Props = {
  product: LocationProductItem;
  onDeliver: (product: LocationProductItem, qty: number) => void;
};

export default function LocationDeliverCard({ product, onDeliver }: Props) {

  const quickAmounts = getQuickAmounts(product);
  const initialQty =
    product.companyProduct?.suggestedQuantity ??
    getQuickAmounts(product)[0];

  const [qty, setQty] = useState(initialQty);

  const [showTick, setShowTick] = useState(false);

  const inc = () => setQty(q => q + 1);
  const dec = () => setQty(q => Math.max(1, q - 1));

  const handleDeliver = () => {
    onDeliver(product, qty);
    setShowTick(true);
    setTimeout(() => setShowTick(false), 600);
  };

  return (
    <div className="bg-white-soft border border-gray-light rounded-2xl p-4 shadow-sm">

      {/* HEADER */}
      <div>
        

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

          <span className="font-semibold text-dark">
            {qty}
          </span>

          <button onClick={inc} className="w-12 h-full text-lg">
            +
          </button>
        </div>

        {/* CTA */}
        <button
          onClick={handleDeliver}
          className="
            h-12 w-20
            bg-primary text-white-soft
            rounded-xl
            font-semibold
            active:scale-95
            transition
          "
        >
          {showTick ? "✓" : "Entregar"}
        </button>

      </div>
    </div>
  );
}