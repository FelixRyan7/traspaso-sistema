import { useMemo, useState } from "react";
import { useCompanyProducts, useToggleCompanyProduct, useUpdateCompanyProduct, type CompanyProduct, } from "../hooks/useAdminProducts";
import { DataTable } from "../components/ui/Tables/dataTable";
import type { Column } from "../types/table";
import ProductModalForm from "../components/forms/ProductForm";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { useCreateProduct } from "../hooks/useCreateProduct";
import { AlertList, type AlertMessage } from "../components/ui/Alerts/AlertList";
import { getApiError } from "../api/apiError";
import type { ProductFormData } from "../schemas/createProduct.schema";
import { useLocations } from "../hooks/PosHooks/useLocations";
import { ErrorState } from "../components/ui/Alerts/ErrorState";
import { formatUnitType } from "../helpers/formatUnitType";
import { formatQuantity } from "../helpers/formatQuantity";
import EditCompanyProductForm from "../components/forms/EditCompanyProductForm";
import type { EditCompanyProductFormData } from "../schemas/editCompanyProduct.schema";

export default function Products() {
  const { data: locations = [], error: locationsError } = useLocations();
  const { data: products = [],  error: productsError } = useCompanyProducts();
 
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<CompanyProduct | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleEditProduct = (row: CompanyProduct) => {
    setSelectedProduct(row);
    setEditOpen(true);
  };
  const {
    mutateAsync: updateCompanyProduct,
    isPending: isUpdating,
  } = useUpdateCompanyProduct();

  const handleUpdateProduct = async (
    data: EditCompanyProductFormData
  ): Promise<void> => {
    if (!selectedProduct) return;

    try {
      await updateCompanyProduct({
        companyProductId: selectedProduct.id,
        data,
      });

      addAlert({
        id: Date.now(),
        type: "success",
        icon: <CheckCircleOutlineOutlinedIcon />,
        content: "Configuración del producto actualizada correctamente",
      });

      setEditOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      const apiError = getApiError(err);

      addAlert({
        id: Date.now(),
        type: "error",
        icon: <ErrorOutlineOutlinedIcon />,
        content: apiError.message,
      });
    }
  };

  const filteredData = useMemo(() => {
    return products?.filter((product) =>
      product.product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [products, search]);

  const addAlert = (alert: AlertMessage) => {
    setAlerts((prev) => [...prev, alert]);
  };

  const removeAlert = (id: number | string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const { mutateAsync, isPending } = useCreateProduct();

  const handleCreateProduct = async (data: ProductFormData): Promise<void> => {
    mutateAsync(data, {
      onSuccess: () => {
        addAlert({
          id: Date.now(),
          type: "success",
          icon: <CheckCircleOutlineOutlinedIcon/>,
          content: "Producto creado correctamente",
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
  };

  const {
    mutateAsync: toggleCompanyProduct,
    isPending: isToggling,
  } = useToggleCompanyProduct();

  const handleToggleProduct = async (row: CompanyProduct) => {
    try {
      await toggleCompanyProduct(row.id);

      addAlert({
        id: Date.now(),
        type: "success",
        icon: <CheckCircleOutlineOutlinedIcon />,
        content: row.isActive
          ? "Producto desactivado correctamente"
          : "Producto activado correctamente",
      });
    } catch (err) {
      const apiError = getApiError(err);

      addAlert({
        id: Date.now(),
        type: "error",
        icon: <ErrorOutlineOutlinedIcon />,
        content: apiError.message,
      });
    }
  };

  const columns: Column<CompanyProduct>[] = [
    {
      key: "product",
      header: "Producto",
      render: (_, row) => (
        <div>
          <p className="font-semibold text-dark">
            {row.product.name}
          </p>

          {row.product.subcategory && (
            <p className="text-xs text-gray-dark">
              {row.product.subcategory}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "unitType",
      header: "Formato",
      render: (_, row) =>
        `${formatUnitType(row.product.unitType)} · ${formatQuantity(
          row.product.quantity,
          row.product.quantityUnit
        )}`,
    },
    {
      key: "operationalArea",
      header: "Área",
      render: (value) =>
        value === "bar" ? "Bar" : "Cocina",
    },
    {
      key: "isActive",
      header: "Estado",
      render: (value) => (
        <span
          className={
            value
              ? "rounded-full bg-success-soft px-3 py-1 text-xs font-medium text-success"
              : "rounded-full bg-error-soft px-3 py-1 text-xs font-medium text-error"
          }
        >
          {value ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Acciones",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleEditProduct(row)}
            className="rounded-md px-2 py-1 text-sm font-medium text-primary bg-primary-soft hover:bg-primary hover:text-white"
            aria-label={`Editar ${row.product.name}`}
          >
            <EditOutlinedIcon />
          </button>

          <button
            type="button"
            disabled={isToggling}
            onClick={() => handleToggleProduct(row)}
            className={`rounded-md px-3 py-1 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed ${
              row.isActive
                ? "bg-error hover:bg-error-strong"
                : "bg-success hover:bg-success"
            }`}
          >
            {row.isActive ? "Desactivar" : "Activar"}
          </button>
        </div>
      ),
    },
  ];

  const error = productsError ?? locationsError;

  if (error) {
    return <ErrorState error={error} />;
  }
  
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Productos</h2>
        <AlertList
          messages={alerts}
          onClose={removeAlert}
          floating
        />

        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          + Add product
        </button>
      </div>

      <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-start gap-3">
          <InfoOutlinedIcon className="mt-0.5 text-gray-500" />

          <div>
            <h3 className="text-sm font-semibold text-dark">
              Disponibilidad de productos
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              Activa o desactiva los productos para controlar su disponibilidad
              en la aplicación. Desactivarlos no elimina su historial ni los
              registros anteriores.
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <input
        className="mb-4 w-full md:w-1/3 px-4 py-2 border rounded-lg"
        placeholder="Buscar producto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <DataTable data={filteredData} columns={columns} />

      {/* MODAL */}
      <ProductModalForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmitProduct={handleCreateProduct}
        isPending={isPending}
        locations={locations}
      />

      <EditCompanyProductForm
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedProduct(null);
        }}
        companyProduct={selectedProduct}
        onSubmitProduct={handleUpdateProduct}
        isPending={isUpdating}
      />
    </div>
  );
}
