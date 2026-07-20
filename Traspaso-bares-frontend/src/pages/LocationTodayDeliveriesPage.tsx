import { useParams } from "react-router-dom";
import { Spinner } from "../components/ui/Loaders/Spinner";
import { useLocationDeliveredRequests } from "../hooks/orderHooks/useLocationDeliveredRequests";
import LocationDeliveredCard from "../components/cards/LocationDeliveredCard";
import { useState } from "react";
import type { LocationRequestWithProduct } from "../types/requests";
import { useUpdateLocationDeliveredRequest } from "../hooks/orderHooks/useUpdateLocationDeliveredRequest";
import { useAlerts } from "../hooks/alerts/useAlerts";
import { AlertList } from "../components/ui/Alerts/AlertList";

import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import { useWorkspaceLocation } from "../hooks/PosHooks/useLocation";
import { ErrorState } from "../components/ui/Alerts/ErrorState";
import { Button } from "../components/ui/Buttons/Button";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



export default function LocationTodayDeliveriesPage() {
  const { locationId } = useParams();
  
  const { data: location } = useWorkspaceLocation(
    Number(locationId)
  );

  const { data = [], isLoading, error } =
    useLocationDeliveredRequests(Number(locationId));

  const updateRequest = useUpdateLocationDeliveredRequest();

  const [editItem, setEditItem] =
    useState<LocationRequestWithProduct | null>(null);

  const [editQty, setEditQty] = useState<number>(0);
  const { pushAlert, removeAlert, alerts } = useAlerts();

  const handleUpdateQuantity = async () => {
  if (!editItem) return;

  try {
    await updateRequest.mutateAsync({
      id: editItem.id,
      quantity: editQty,
    });

    pushAlert({
      type: "success",
      content: `${editItem.product?.name} actualizado a ${editQty}`,
      icon: <DoneAllOutlinedIcon/>,
    });

    setEditItem(null);
  } catch (error) {
    pushAlert({
      type: "error",
      content: `Error al actualizar ${editItem.product?.name}`,
      icon: <ReportProblemOutlinedIcon/>,
    });
  }
};

  if (isLoading) return <Spinner />;
  if (error) { return <ErrorState error={error} />; }
  return (
    <div className="">
      <Button to={`/workspace/locations/${locationId}`}><ArrowBackIosIcon/></Button>
      <h3 className="text-dark mt-5 mb-2">Productos entregados a {location?.name}</h3>
      <div className="border border-gray-light/40 mb-6" />
      <div className="space-y-2">
      <AlertList
            messages={alerts}
            onClose={removeAlert}
            floating
          />

      {/* LIST */}
      {data.map((req) => (
        <LocationDeliveredCard
          key={req.id}
          productName={req.product?.name}
          quantity={req.quantity}
          time={new Date(req.updatedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          onUndo={() => console.log("revert")}
          onEdit={() => {
            setEditItem(req);
            setEditQty(req.quantity);
          }}
          onDelete={() => console.log("delete")}
        />
      ))}
      </div>

      {/* MODAL / BOTTOM SHEET */}
      {editItem && (
        <div
          className="fixed inset-0 bg-black/40 flex items-end justify-center z-50"
          onClick={() => setEditItem(null)}
        >
          <div
            className="w-full bg-white-soft rounded-t-2xl p-5 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >

            <h3 className="font-semibold text-dark">
              Editar cantidad
            </h3>

            <p className="text-sm text-gray mt-1">
              {editItem.product?.name}
            </p>

            {/* STEPPER */}
            <div className="mt-5 flex items-center justify-between border border-gray-light rounded-xl h-12 px-4">

              <button
                onClick={() =>
                  setEditQty((q) => Math.max(1, q - 1))
                }
                className="text-xl w-10"
              >
                −
              </button>

              <span className="font-semibold">
                {editQty}
              </span>

              <button
                onClick={() =>
                  setEditQty((q) => q + 1)
                }
                className="text-xl w-10"
              >
                +
              </button>

            </div>

            {/* ACTION */}
            <button
              onClick={handleUpdateQuantity}
              className="mt-5 w-full bg-primary text-white-soft rounded-xl py-3 font-semibold active:scale-95 transition"
            >
              Guardar cambios
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
