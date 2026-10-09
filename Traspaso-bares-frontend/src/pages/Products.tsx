import { useMemo, useState } from "react";
import { useCompanyProducts } from "../hooks/useAdminProducts";
import { DataTable } from "../components/ui/Tables/dataTable";
import type { CompanyProduct } from "../hooks/useAdminProducts";
import type { Column } from "../types/table";
import ProductModalForm from "../components/forms/ProductForm";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useCreateProduct } from "../hooks/useCreateProduct";
import { AlertList, type AlertMessage } from "../components/ui/Alerts/AlertList";
import { getApiError } from "../api/apiError";
import type { ProductFormData } from "../schemas/createProduct.schema";
import { useLocations } from "../hooks/PosHooks/useLocations";
import { ErrorState } from "../components/ui/Alerts/ErrorState";
import { formatUnitType } from "../helpers/formatUnitType";
import { formatQuantity } from "../helpers/formatQuantity";

import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import PowerOffOutlinedIcon from "@mui/icons-material/PowerOffOutlined";

export default function Products() {
  const { data: locations = [], error: locationsError } = useLocations();
  const { data: products = [],  error: productsError } = useCompanyProducts();
 
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

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
        onClick={() => console.log("editar", row)}
        className="rounded-md px-2 py-1 text-sm font-medium text-primary bg-primary-soft hover:bg-primary hover:text-white"
      >
        <EditOutlinedIcon />
      </button>

      <button
        type="button"
       
        className="rounded-md px-3 py-1 text-sm font-medium text-white bg-error hover:bg-error-strong hover:text-white"
      >
        {row.isActive ? "Desactivar" : "Activar"}
      </button>
    </div>
  ),
},
  ];

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
    console.log(data)
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


  const error = productsError ?? locationsError;

  if (error) {
    return <ErrorState error={error} />;
  }
  
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Products</h2>
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

      {/* SEARCH */}
      <input
        className="mb-4 w-full md:w-1/3 px-4 py-2 border rounded-lg"
        placeholder="Search product..."
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
    </div>
  );
}
