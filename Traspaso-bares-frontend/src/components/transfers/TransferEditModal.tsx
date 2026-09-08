import { useEffect, useState } from "react";

import { formatSpanishDate } from "../../helpers/formatSpanishDate";
import { formatUnitType } from "../../helpers/formatUnitType";
import type { LocationRequestWithProduct } from "../../types/requests";
import Modal from "../modals/Modal";
import { Button } from "../ui/Buttons/Button";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type TransferEditModalProps = {
  open: boolean;
  transfer: LocationRequestWithProduct | null;
  loading?: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
};

export default function TransferEditModal({
  open,
  transfer,
  loading = false,
  onClose,
  onConfirm,
}: TransferEditModalProps) {
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (transfer) {
      setQuantity(String(transfer.quantity));
    }
  }, [transfer]);

  if (!transfer) return null;

  const parsedQuantity = Number(quantity);
  const isValidQuantity =
    quantity !== "" &&
    Number.isInteger(parsedQuantity) &&
    parsedQuantity > 0;

  const handleConfirm = () => {
    if (!isValidQuantity) return;

    onConfirm(parsedQuantity);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-full max-w-md pr-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-dark">
            Editar traspaso
          </h2>

          <p className="mt-2 text-sm text-gray-dark">
            Modifica la cantidad de unidades de este traspaso.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-gray-light p-4">
            <p className="text-sm font-medium text-gray-dark">
              Producto
            </p>

            <p className="mt-1 font-semibold text-dark">
              {transfer.product.name}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-dark">
                Fecha
              </p>

              <p className="mt-1 font-semibold text-dark">
                {formatSpanishDate(transfer.date)}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-dark">
                Cantidad actual
              </p>

              <p className="mt-1 font-semibold text-dark">
                {transfer.quantity}{" "}
                {formatUnitType(
                  transfer.product.unitType,
                  transfer.quantity
                )}
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="transfer-quantity"
              className="mb-2 block text-sm font-semibold text-dark"
            >
              Nueva cantidad
            </label>

            <input
              id="transfer-quantity"
              type="number"
              min={1}
              step={1}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-gray-100"
            />

            {!isValidQuantity && quantity !== "" && (
              <p className="mt-2 text-sm font-medium text-error">
                La cantidad debe ser un número entero mayor que 0.
              </p>
            )}
          </div>

          <div className="rounded-lg bg-primary-soft p-4 text-sm text-primary flex gap-3">
            <p className="flex justify-center items-center text-primary"><InfoOutlinedIcon/></p>
            <p>
              Solo se modificará la cantidad del traspaso. El resto
              de los datos permanecerá sin cambios.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            radius="md"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>

          <Button
            type="button"
            radius="md"
            onClick={handleConfirm}
            disabled={!isValidQuantity || loading}
            loading={loading}
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}