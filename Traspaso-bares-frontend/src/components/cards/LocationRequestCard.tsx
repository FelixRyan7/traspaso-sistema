import { useState } from "react";
import type { LocationRequestWithProduct } from "../../types/requests";
import { Button } from "../ui/Buttons/Button";
import DropdownMenu from "../ui/Dropdowns/DropdownMenu";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { formatRelativeDate } from "../../helpers/formatRelativeDate";

export type ProductSummary = {
  productId: number;
  quantity: number;
  product: LocationRequestWithProduct["product"];
  itemId: number;
  createdAt: string;
};

type Props = {
  item: ProductSummary;
  onDeliver: (item: ProductSummary, quantity: number) => void;
  onDelete?: (item: ProductSummary) => void; // Auno por implemenntar y añadir a props
  onLowStock?: (item: ProductSummary) => void; // Auno por implemenntar y añadir a props
};

export default function LocationRequestCard({
  item,
  onDeliver,

}: Props) {
  const [qty, setQty] = useState(item.quantity);

  const inc = () => setQty(q => q + 1);
  const dec = () => setQty(q => Math.max(1, q - 1));

  

  const handleDelete = (itemId: number) => {
    console.log("delete item" + itemId)
  };

  const handleMarkLowStock = (productId: number) => {
    console.log("stock low" + productId)
  };

  return (
    <div className="
      relative
      bg-white-soft
      border border-gray-light
      rounded-2xl
      p-4
      shadow-sm
    ">
      

      {/* ⋯ MENU TOP RIGHT */}
      <div className="absolute top-3 right-3">
        <DropdownMenu
          triggerIcon="..."
          options={[
        {
          label: "Stock bajo",
          icon: <WarningAmberIcon />,
          onClick: () => {handleMarkLowStock(item.product.id)},
        },
        {
          label: "Eliminar del pedido",
          icon: <DeleteOutlineIcon />,
          destructive: true,
          onClick: () => {handleDelete(item.itemId)},
        },
        ]}
        />
      </div>

      {/* CONTENT */}
      <div className="pr-10 flex flex-col justify-between">
        <div className="font-semibold text-dark">
          {item.product.name} {item.product.quantity} {item.product.quantityUnit}
        </div>

        <div className="text-sm text-gray mt-1">
          Pedido: <span className="font-medium"> {formatRelativeDate(item.createdAt)} | {item.quantity}</span>
        </div>

        
      </div>

      <div className="flex justify-between items-center align-center mt-6">

      {/* STEPPER */}
        <div className="flex items-center gap-2">
          <button
            onClick={dec}
            className="
              w-9 h-9
              rounded-lg
              border border-gray-light
              text-dark
              hover:bg-gray-light/20
              transition
            "
          >
            -
          </button>

          <span className="w-10 text-center font-semibold text-dark">
            {qty}
          </span>

          <button
            onClick={inc}
            className="
              w-9 h-9
              rounded-lg
              border border-gray-light
              text-dark
              hover:bg-gray-light/20
              transition
            "
          >
            +
          </button>
        </div>
      {/* BOTTOM RIGHT ACTION */}
      <div className="">
        <Button
          onClick={() => onDeliver(item, qty)}
          className="
            bg-gradient-to-r from-primary to-primary-strong
            text-white-soft
            rounded-xl
            font-semibold
            px-5 py-2
            active:scale-95
            transition
          "
        >
          Entregar
        </Button>
      </div>
      </div>
    </div>
  );
}