import { useNavigate, useParams } from "react-router-dom";
import type { LocationRequestWithProduct } from '../types/requests';

import { useLocationRequests } from '../hooks/orderHooks/useLocationRequests';
import LocationRequestCard from '../components/cards/LocationRequestCard';
import { useDeliverLocationRequest } from "../hooks/orderHooks/useDeliverLocationRequest";
import {  useState } from "react";
import { useAlerts } from "../hooks/alerts/useAlerts";

import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { AlertList } from "../components/ui/Alerts/AlertList";
import { Button } from "../components/ui/Buttons/Button";
import { useWorkspaceLocation } from "../hooks/PosHooks/useLocation";

type ProductSummary = {
  productId: number;
  quantity: number;
  product: LocationRequestWithProduct["product"];
  itemId: number; 
  createdAt: string;
};

export default function LocationRequestsPage() {
  const navigate = useNavigate()
  const { locationId } = useParams();
  const { data: location } = useWorkspaceLocation(
    Number(locationId)
  );

  const [removingIds, setRemovingIds] = useState<number[]>([]);
  const deliverRequest = useDeliverLocationRequest();
  const { alerts, pushAlert, removeAlert } = useAlerts();
  
  
  const handleDeliver = (item: ProductSummary, qty: number) => {
    setRemovingIds(prev => [...prev, item.itemId]);

  deliverRequest.mutate(
    {
      id: item.itemId,
      quantity: qty,
      locationId: Number(locationId),
    },
    {
      onSuccess: () => {
        pushAlert({
          type: "success",
          content: `${item.product.name} entregado × ${qty}`,
          icon: <DoneOutlineOutlinedIcon />
        });
      },
      onError: () => {
        // si falla, revertir animación
        setRemovingIds(prev => prev.filter(id => id !== item.itemId));
         pushAlert({
          type: "error",
          content: `Error al entregar ${item.product.name}`,
          icon: <ReportProblemOutlinedIcon />
        });
      },
    }
  );
  };

  const { data: requests = [], isLoading, error } = useLocationRequests(Number(locationId));
  const products = requests
  .filter(r => r.status === "pending")
  .map(r => ({
    productId: r.productId,
    quantity: r.quantity,
    product: r.product,
    itemId: r.id,
    createdAt: r.createdAt
  }));


  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error cargando órdenes</p>;

  return (
  <div className="p-4">
    <AlertList
      messages={alerts}
      onClose={removeAlert}
      floating
    />
    <div className="flex justify-between">
    <div>
    <h1 className="text-2xl font-bold text-dark">
      Lista de {location?.name} 
    </h1>
    <p className="text-sm text-gray mt-1 mb-5">
      {products.length} productos pendientes
    </p>
    <p className="text-sm text-gray mt-1 mb-5">
      {new Date().toLocaleDateString("es-ES", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      })}
    </p>
    </div>
    <div>
      <Button
        onClick={() => navigate(`/workspace/locations/${locationId}/list`)}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-primary text-white shadow-md hover:shadow-lg hover:scale-105 transition"
      >
         <AddCircleOutlineOutlinedIcon />
      </Button>
    </div>
    </div>

    {products.length === 0 && (
      <div className="md:mt-20 text-center">
        <div className="text-lg font-semibold bg-primary-soft p-5 rounded-xl text-primary flex justify-center gap-2 items-center">
          <DoneAllOutlinedIcon/> Todo Entregado
        </div>

        <p className="text-sm text-gray mt-4">
          No hay productos pendientes en esta ubicación.
        </p>

        <Button
          variant="ghost"
          onClick={() => navigate(`/workspace/locations/${locationId}`)}
          className="mt-2"
        >
          Volver al Workspace
        </Button>
      </div>
    )}
    
    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map(item => {
        const isRemoving = removingIds.includes(item.itemId);

        return (
          <div
            key={item.itemId}
            className={`
              transition-all duration-400 ease-out
              ${isRemoving ? "opacity-0 scale-75 translate-y-2" : "opacity-100"}
            `}
          >
            <LocationRequestCard
              item={item}
              onDeliver={handleDeliver}
            />
          </div>
        );
      })}
    </div>
  </div>
);
}
