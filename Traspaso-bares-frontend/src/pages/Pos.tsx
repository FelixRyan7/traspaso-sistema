import { useMemo, useState } from "react";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

import { AlertList } from "../components/ui/Alerts/AlertList";
import type { AlertMessage } from "../components/ui/Alerts/AlertList";

import LocationCard from "../components/cards/LocationCard";
import LocationModalForm from "../components/forms/LocationForm";

import { Button } from "../components/ui/Buttons/Button";
import { useLocations } from "../hooks/PosHooks/useLocations";

import { Spinner } from "../components/ui/Loaders/Spinner";
import { useCreatePos } from "../hooks/PosHooks/useCreatePos";
import type { LocationFormData } from "../schemas/createLocation.schema";
import { getApiError } from "../api/apiError";
import { ErrorState } from "../components/ui/Alerts/ErrorState";
import type { Location } from "../types/location";
import { useUpdateLocation } from "../hooks/PosHooks/useUpdateLocation";

export default function Pos() {
  const { data: locations = [], isLoading, error } = useLocations();
  const { mutateAsync: createLocation, isPending: creating } = useCreatePos();
  const { mutateAsync: updateLocation, isPending: updating } = useUpdateLocation();
  const isPending = creating || updating;
  const [editingLocation, setEditingLocation] = useState<Location | undefined>(undefined);
  

  const handleSubmitLocation = async (data: LocationFormData) => {
  if (editingLocation) {
    await updateLocation(
      {
        id: editingLocation.id,
        data,
      },
      {
        onSuccess: () => {
          addAlert({
            id: Date.now(),
            type: "success",
            icon: <CheckCircleOutlineOutlinedIcon />,
            content: "POS actualizado correctamente",
          });

          setOpen(false);
          setEditingLocation(undefined);
        },

        onError: (err: any) => {
          const apiError = getApiError(err);

          addAlert({
            id: Date.now(),
            type: "error",
            icon: <ErrorOutlineOutlinedIcon />,
            content: apiError.message,
          });
        },
      }
    );
  } else {
    await createLocation(data, {
      onSuccess: () => {
        addAlert({
          id: Date.now(),
          type: "success",
          icon: <CheckCircleOutlineOutlinedIcon />,
          content: "POS creado correctamente",
        });

        setOpen(false);
      },

      onError: (err: any) => {
        const apiError = getApiError(err);

        addAlert({
          id: Date.now(),
          type: "error",
          icon: <ErrorOutlineOutlinedIcon />,
          content: apiError.message,
        });
      },
    });
  }
};

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const addAlert = (alert: AlertMessage) => {
    setAlerts((prev) => [...prev, alert]);
  };

  const removeAlert = (id: number | string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

   const filteredLocations = useMemo(() => {
    return locations.filter((location) =>
      location.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [locations, search]);
  

  if(isLoading) return (
  <>
    <div className="min-h-screen flex justify-center items-center align-center">
      <Spinner size="lg"/>
    </div>
    </>)

  if (error) { return <ErrorState error={error} />; }
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">
            Puntos de venta
          </h1>
        </div>

        <Button
          onClick={() => {
            setEditingLocation(undefined);
            setOpen(true);
          }}
        >
          Add POS
        </Button>
      </div>

      {/* ALERTS */}
      <AlertList
        messages={alerts}
        onClose={removeAlert}
        floating
      />

      {/* SEARCH */}
      <input
        className="
          mb-6 w-full md:w-1/3
          px-4 py-2 border rounded-lg
        "
        placeholder="Buscar POS..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* GRID */}
      <div
        className="
          grid grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-4
        "
      >
        {filteredLocations.map((location: any) => (
          <LocationCard
            key={location.id}
            onEdit={(location) => {
              setEditingLocation(location);
              setOpen(true);
            }}
            location={location}
          />
        ))}
      </div>

      {/* MODAL Create POS */}
      <LocationModalForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmitLocation={handleSubmitLocation}
        isPending={isPending}
        location={editingLocation}
      />
    </div>
  );
}