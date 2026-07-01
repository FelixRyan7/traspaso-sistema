import MoreVertOutlinedIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";

type Props = {
  productName: string;
  quantity: number;
  time: string;
  onEdit?: () => void;
  onUndo?: () => void;
  onDelete?: () => void;
};

export default function LocationDeliveredCard({
  productName,
  quantity,
  time,
  onEdit,
  onUndo,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);
  

  return (
    <div className="bg-white-soft border border-gray-light rounded-xl px-4 py-3 relative">

      {/* MAIN ROW */}
      <div className="flex items-center justify-between">

        {/* LEFT */}
        <div className="flex flex-col">
          <p className="font-semibold text-dark">
            {productName}
          </p>

          <p className="text-xs text-gray">
            {time}
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-primary-soft text-primary text-sm font-semibold">
            x{quantity}
          </span>

          {/* MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <MoreVertOutlinedIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* ACTION MENU */}
      {open && (
        <div className="absolute right-3 top-12 w-40 bg-white-soft border border-gray-light rounded-xl shadow-md z-10 overflow-hidden">

          {onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
            >
              <EditOutlinedIcon fontSize="small" />
              Editar
            </button>
          )}

          {onUndo && (
            <button
              onClick={onUndo}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
            >
              <UndoOutlinedIcon fontSize="small" />
              Revertir
            </button>
          )}

          {onDelete && (
            <button
              onClick={onDelete}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-error hover:bg-error-soft"
            >
              <DeleteOutlineOutlinedIcon fontSize="small" />
              Eliminar
            </button>
          )}

        </div>
      )}
    </div>
  );
}