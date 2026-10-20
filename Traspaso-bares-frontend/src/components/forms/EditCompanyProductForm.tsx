
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  editCompanyProductSchema,
  type EditCompanyProductFormData,
} from "../../schemas/editCompanyProduct.schema";

import InputFloatingRHF from "../ui/Inputs/FloatingInput";
import SelectFloatingRHF from "../ui/Inputs/SelectInput";
import { Button } from "../ui/Buttons/Button";
import { Spinner } from "../ui/Loaders/Spinner";
import Modal from "../modals/Modal";

import type { CompanyProduct } from "../../hooks/useAdminProducts";

type Props = {
  open: boolean;
  onClose: () => void;
  companyProduct: CompanyProduct | null;
  onSubmitProduct: (
    data: EditCompanyProductFormData
  ) => Promise<void>;
  isPending: boolean;
};

const INVENTORY_UNIT_OPTIONS = [
  { value: "unit", label: "Unidad" },
  { value: "kg", label: "Kilogramos (kg)" },
  { value: "g", label: "Gramos (g)" },
  { value: "l", label: "Litros (l)" },
  { value: "ml", label: "Mililitros (ml)" },
];

const OPERATIONAL_AREA_OPTIONS = [
  { value: "bar", label: "Bar" },
  { value: "kitchen", label: "Cocina" },
];

export default function EditCompanyProductForm({
  open,
  onClose,
  companyProduct,
  onSubmitProduct,
  isPending,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<EditCompanyProductFormData>({
    resolver: zodResolver(editCompanyProductSchema),
    mode: "onChange",
    defaultValues: {
      suggestedQuantity: null,
      inventoryUnit: null,
      operationalArea: "bar",
    },
  });

  // Cargar los valores actuales cada vez que se abre
  // el modal o cambia el producto seleccionado.
  useEffect(() => {
    if (open && companyProduct) {
      reset({
        suggestedQuantity: companyProduct.suggestedQuantity,
        inventoryUnit: companyProduct.inventoryUnit,
        operationalArea: companyProduct.operationalArea,
      });
    }
  }, [open, companyProduct, reset]);

  const internalSubmit = async (
    data: EditCompanyProductFormData
  ) => {
    await onSubmitProduct(data);
  };

  if (!open || !companyProduct) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex max-h-[85vh] flex-col">
        <div className="mb-1 p-4">
          <h2 className="text-center text-xl font-bold">
            Editar producto
          </h2>

          <p className="mt-1 text-center text-sm text-gray-dark">
            {companyProduct.product.name} {companyProduct.product.quantity} {companyProduct.product.quantityUnit}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(internalSubmit)}
          className="scroll-area overflow-y-auto py-6 pr-2"
        >
          {/* CANTIDAD SUGERIDA */}
          <InputFloatingRHF
            id="suggestedQuantity"
            label="Cantidad sugerida para traspasos"
            type="number"
            register={register("suggestedQuantity", {
              setValueAs: (value) =>
                value === "" ? null : Number(value),
            })}
            value={watch("suggestedQuantity") ?? ""}
            error={errors.suggestedQuantity?.message}
          />

          {/* UNIDAD DE INVENTARIO */}
          <Controller
            control={control}
            name="inventoryUnit"
            render={({ field }) => (
              <SelectFloatingRHF
                id="inventoryUnit"
                label="Unidad de inventario"
                options={INVENTORY_UNIT_OPTIONS}
                value={field.value ?? ""}
                onChange={(value) =>
                  field.onChange(value === "" ? null : value)
                }
                error={errors.inventoryUnit?.message}
              />
            )}
          />

          {/* ÁREA OPERATIVA */}
          <Controller
            control={control}
            name="operationalArea"
            render={({ field }) => (
              <SelectFloatingRHF
                id="operationalArea"
                label="Área operativa"
                options={OPERATIONAL_AREA_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                error={errors.operationalArea?.message}
              />
            )}
          />

          <Button
            type="submit"
            className="mt-5 w-full py-3"
            disabled={!isValid || isPending}
          >
            {isPending ? (
              <>
                <Spinner bg="gray-dark" />
                Guardando...
              </>
            ) : (
              "Guardar cambios"
            )}
          </Button>
        </form>
      </div>
    </Modal>
  );
}
