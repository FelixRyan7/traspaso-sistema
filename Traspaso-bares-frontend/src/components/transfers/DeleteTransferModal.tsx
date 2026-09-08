import { formatSpanishDate } from "../../helpers/formatSpanishDate";
import type { LocationRequestWithProduct } from "../../types/requests";
import Modal from "../modals/Modal";
import { Button } from "../ui/Buttons/Button";

type DeleteTransferModalProps = {
  open: boolean;
  transfer: LocationRequestWithProduct | null;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteTransferModal({
  open,
  transfer,
  loading = false,
  onClose,
  onConfirm,
}: DeleteTransferModalProps) {
  if (!transfer) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-full max-w-md pr-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-error/10">
            <svg
              className="h-6 w-6 text-error"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.5m0 3.5h.01M10.29 3.86l-7.36 12.75A2 2 0 004.66 19.6h14.68a2 2 0 001.73-2.99L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          </div>

          <div>
            <h2 className="text-xl font-bold text-dark">
              Anular traspaso
            </h2>

            <p className="mt-1 text-sm leading-5 text-gray-dark">
              Esta acción marcará el movimiento como anulado.
            </p>
          </div>
        </div>

        {/* Separador */}
        <div className="mt-6 h-px bg-gray-light" />

        {/* Transfer summary */}
        <div className="mt-6 overflow-hidden  rounded-2xl bg-white">
            <div className="px-1 flex justify-between">
                <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-dark">
                    Traspaso a anular
                    </span>

                    <p className="mt-1 text-base font-semibold text-dark">
                    {transfer.product.name}
                    </p>
                </div>
                {/* Fecha */}
                <div className="rounded-xl text-gray px-1 py-1 ">
                    <span className="text-sm font-semibold bg-success-soft p-2 rounded-full text-success tracking-wide">
                        {transfer.deliveredAt
                            ? formatSpanishDate(transfer.date)
                            : "Sin fecha"
                        }
                    </span>
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-6">
                {/* Cantidad */}
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-dark">
                        Cantidad
                    </p>

                    <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-dark">
                            {transfer.quantity}
                        </span>

                        <span className="text-sm font-medium text-gray-dark">
                            {transfer.product.unitType}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* Warning */}
        <div className="mt-6 flex gap-3 rounded-xl bg-error/5 p-4">
          <svg
            className="mt-0.5 h-5 w-5 shrink-0 text-error"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.5m0 3.5h.01M10.29 3.86l-7.36 12.75A2 2 0 004.66 19.6h14.68a2 2 0 001.73-2.99L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>

          <p className="text-sm leading-5 text-gray-dark">
            <span className="font-semibold text-dark">
              El movimiento no se eliminará.
            </span>{" "}
            Se conservará en el historial y quedará registrado como
            anulado.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-7 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            radius="md"
            onClick={onClose}
            disabled={loading}
          >
            Mantener traspaso
          </Button>

          <Button
            type="button"
            variant="danger"
            radius="md"
            onClick={onConfirm}
            loading={loading}
          >
            {loading ? "Anulando..." : "Sí, anular traspaso"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
