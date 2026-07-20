import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  locationSchema,
  type LocationFormData,
} from "../../schemas/createLocation.schema";

import Modal from "../modals/Modal";

import InputFloatingRHF from "../ui/Inputs/FloatingInput";
import { Button } from "../ui/Buttons/Button";
import { Spinner } from "../ui/Loaders/Spinner";
import { useEffect } from "react";
import type { Location } from "../../types/location";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmitLocation: (
    data: LocationFormData
  ) => Promise<void>;
  isPending: boolean;
  location?: Location;
};

export default function LocationModalForm({
  open,
  onClose,
  onSubmitLocation,
  isPending,
  location
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
  });

  useEffect(() => {
  if (location) {
    reset({
      name: location.name,
      type: location.type,
    });
  } else {
    reset({
      name: "",
      type: "bar",
    });
  }
}, [location, reset]);

  const handleFormSubmit = async (
    data: LocationFormData
  ) => {
    await onSubmitLocation(data);

    reset();
  };

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-center">
          Crear punto de venta
        </h2>

        {/* NAME */}
        <InputFloatingRHF
          id="name"
          label="Nombre"
          type="text"
          register={register("name")}
          error={errors.name?.message}
          value={watch("name")}
        />

        {/* TYPE */}
        <InputFloatingRHF
          id="type"
          label="Tipo"
          type="select"
          register={register("type")}
          error={errors.type?.message}
          value={watch("type")}
          options={[
            {
              value: "bar",
              label: "Bar",
            },
            {
              value: "restaurant",
              label: "Restaurante",
            },
            {
              value: "storage",
              label: "Almacén",
            },
            {
              value: "kitchen",
              label: "Cocina",
            },
            {
              value: "rooftop",
              label: "Rooftop",
            },
            {
              value: "beach_bar",
              label: "Beach Bar",
            },
            {
              value: "other",
              label: "Otros",
            },
          ]}
        />

      <Button
        type="submit"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Spinner bg="gray-dark" />
            Guardando...
          </>
        ) : location ? (
          "Guardar cambios"
        ) : (
          "Crear POS"
        )}
      </Button>
      </form>
    </Modal>
  );
}