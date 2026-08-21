import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { productSchema, type ProductFormData } from "../../schemas/createProduct.schema";

import InputFloatingRHF from "../ui/Inputs/FloatingInput";
import { Button } from "../ui/Buttons/Button";
import { Spinner } from "../ui/Loaders/Spinner";

import Modal from "../modals/Modal";
import type { Location } from "../../hooks/PosHooks/useLocations";
import MultiSelectRHF from "../ui/Inputs/MultiSelectInput";
import SelectFloatingRHF from "../ui/Inputs/SelectInput";

import {
  CATEGORY_OPTIONS,
  UNIT_TYPE_OPTIONS,
  QUANTITY_UNIT_OPTIONS
} from "../../constants/productOptions";
import { SUBCATEGORY_SELECT_OPTIONS } from "../../constants/products";


type Props = {
  open: boolean;
  onClose: () => void;
  onSubmitProduct: (data: ProductFormData) => Promise<void>;
  isPending: boolean
  locations: Location[];
};

export default function ProductModalForm({
  open,
  onClose,
  onSubmitProduct,
  isPending,
  locations
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
  });

  const internalSubmit = async (data: ProductFormData) => {
    console.log(data)
  await onSubmitProduct(data);

  reset(); // 👈 limpia el formulario
  };

  if (!open) return null;

  return (
  <>
    <Modal open={open} onClose={onClose}>
    <div className="flex flex-col max-h-[85vh]">
      <div className="p-4 mb-1 ">
      
        <h2 className="text-xl font-bold text-center">
          Crear Producto
        </h2>
      </div>
      <form onSubmit={handleSubmit(internalSubmit)} className="overflow-y-auto pr-2 scroll-area pb-6">
        
          {/* NAME */}
          <InputFloatingRHF
            id="name"
            label="Nombre"
            type="text"
            register={register("name")}
            error={errors.name?.message}
            value={watch("name")}
          />

          {/* CATEGORY */}
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <SelectFloatingRHF
                id="category"
                label="Categoría"
                options={CATEGORY_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                error={errors.category?.message}
              />
            )}
          />

          {/* SUBCATEGORY */}
          <Controller
            control={control}
            name="subcategory"
            render={({ field }) => (
              <SelectFloatingRHF
                id="subcategory"
                label="Subcategoría"
                options={SUBCATEGORY_SELECT_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                error={errors.subcategory?.message}
              />
            )}
          />

        {/* UNIT TYPE */}
          <Controller
            control={control}
            name="unitType"
            render={({ field }) => (
              <SelectFloatingRHF
                id="unitType"
                label="Formato"
                options={UNIT_TYPE_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                error={errors.unitType?.message}
              />
            )}
          />

          {/* QUANTITY UNIT */}
          <Controller
            control={control}
            name="quantityUnit"
            render={({ field }) => (
              <SelectFloatingRHF
                id="quantityUnit"
                label="Unidad medida"
                options={QUANTITY_UNIT_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                error={errors.quantityUnit?.message}
              />
            )}
          />

          {/* QUANTITY */}
          <InputFloatingRHF
            id="quantity"
            label="Cantidad"
            type="number"
            register={register("quantity", {
              valueAsNumber: true,
            })}
            error={errors.quantity?.message}
            value={watch("quantity")}
          />

          {/* SUGGESTED QUANTITY */}
          <InputFloatingRHF
            id="suggestedQuantity"
            label="Cantidad sugerida para pedidos"
            type="number"
            register={register("suggestedQuantity", {
              valueAsNumber: true,
            })}
            error={errors.suggestedQuantity?.message}
            value={watch("suggestedQuantity")}
          />

          {/* LOCATIONS */}
          <Controller
            control={control}
            name="locations"
            render={({ field }) => (
              <MultiSelectRHF
                label="Putos de venta permitidos"
                options={locations.map(l => ({
                  value: l.id,
                  label: l.name
                }))}
                value={field.value || []}
                onChange={field.onChange}
                error={errors.locations?.message}
              />
           )}
          />

          <Button type="submit" className="w-full py-3 mt-5" disabled={!isValid || isPending}>
            {isPending ? (
              <>
                <Spinner bg="gray-dark" />
                Guardando...
              </>
            ) : (
              "Crear producto"
            )}
          </Button>
      </form>
    </div>
    </Modal>
  </>
  );
}