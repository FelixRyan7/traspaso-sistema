import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "../hooks/useLocation";
import { Spinner } from "../components/ui/Loaders/Spinner";
import { getApiError } from "../api/apiError";

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';

import { useLocationRequests } from "../hooks/orderHooks/useLocationRequests";
import { Button } from "../components/ui/Buttons/Button";
import { ErrorState } from "../components/ui/Alerts/ErrorState";

export default function LocationPage() {
  const navigate = useNavigate()
  const { locationId } = useParams();
  const { data: requests = [] } = useLocationRequests(Number(locationId));
  const hasActiveRequests = (requests?.length ?? 0) > 0;

  const { data, isLoading, error } = useLocation(locationId);

  if (isLoading) return <Spinner />;

  if (error) { return <ErrorState error={error} />; }

  return (
    <div className="p-6">
      
      <h1 className="text-2xl font-bold">{data?.name}</h1>

      <p className="text-gray">{data?.type}</p>
      
      <div className="mt-4 flex gap-3 flex-row items-center justify-between">

        {/* Acción secundaria */}
        <Button
          to={`/workspace/locations/${locationId}/today-deliveries`}
          variant="ghost"
          className="w-fit px-0 py-1 text-sm"
        >
          Ver entregas de hoy
        </Button>

        {/* Acción principal contextual */}
        {hasActiveRequests && (
          <Button
            to={`/workspace/locations/${locationId}/requests`}
            variant="primary"
            radius="full"
            className="w-fit text-sm"
          >
            Continuar lista →
          </Button>
        )}

      </div>
  

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* 📋 HACER LISTA */}
      <div
        onClick={() => navigate(`/workspace/locations/${locationId}/list`)}
        className="relative group cursor-pointer bg-white-soft border border-gray-light rounded-2xl p-8 shadow-sm hover:shadow-md transition overflow-hidden"
      >
        {/* glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/40 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition" />

        <h3 className="text-dark text-2xl gap-1 font-bold flex align-center items-center">
          <ListAltOutlinedIcon fontSize="large"/> Hacer lista
        </h3>

        <p className="text-gray mt-2 text-sm">
          Crea una lista de productos para el servicio o turno actual.
        </p>

        <div className="mt-6 inline-flex items-center px-4 py-2 rounded-xl bg-primary text-white-soft text-sm font-semibold">
          Empezar lista →
        </div>
      </div>

      {/* ➕ AÑADIR PRODUCTO */}
      <div
        onClick={() => navigate(`/workspace/locations/${locationId}/add-product`)}
        className="relative group cursor-pointer bg-white-soft border border-gray-light rounded-2xl p-8 shadow-sm hover:shadow-md transition overflow-hidden"
      >
        {/* glow */}
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-success/60 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition" />

        <h3 className="text-dark text-2xl gap-1 font-bold flex align-center items-center">
          <AddOutlinedIcon fontSize="large"/> Añadir producto
        </h3>

        <p className="text-gray mt-2 text-sm">
          Registra una salida inmediata de stock (consumo real ahora).
        </p>

        <div className="mt-6 inline-flex items-center px-4 py-2 rounded-xl bg-success text-white-soft text-sm font-semibold">
          Registrar entrada →
        </div>
      </div>

      {/* ⚠️ NOTIFICAR MERMA */}
      <div
        onClick={() => navigate(`/workspace/locations/${locationId}/loss`)}
        className="relative group cursor-pointer bg-white-soft border border-gray-light rounded-2xl p-8 shadow-sm hover:shadow-md transition overflow-hidden"
      >
      {/* glow */}
      <div className="absolute -bottom-12 -right-12  w-40 h-40 bg-error/60 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition" />

      <h3 className="text-dark text-2xl gap-1 font-bold flex items-center">
        <WarningAmberOutlinedIcon fontSize="large" /> Notificar merma
      </h3>

      <p className="text-gray mt-2 text-sm">
        Registra pérdidas de stock como roturas, caducidad o incidencias.
      </p>

      <div className="mt-6 inline-flex items-center px-4 py-2 rounded-xl bg-red-500 text-white-soft text-sm font-semibold">
        Registrar merma →
      </div>
    </div>

    </div>
      
    </div>
  );
}