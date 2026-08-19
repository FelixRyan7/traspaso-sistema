import { useMemo, useState } from "react";
import { useAdminProducts } from "../hooks/useAdminProducts";
import { DataTable } from "../components/ui/Tables/dataTable";
import type { Product } from "../hooks/useAdminProducts";
import type { Column } from "../types/table";
import ProductModalForm from "../components/forms/ProductForm";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

import { useCreateProduct } from "../hooks/useCreateProduct";
import { AlertList, type AlertMessage } from "../components/ui/Alerts/AlertList";
import { getApiError } from "../api/apiError";
import type { ProductFormData } from "../schemas/createProduct.schema";
import { useLocations } from "../hooks/PosHooks/useLocations";
import { ErrorState } from "../components/ui/Alerts/ErrorState";
import { formatCategory } from "../helpers/formatCategory";
import { formatSubcategory } from "../helpers/formatSubcategory";
import { formatUnitType } from "../helpers/formatUnitType";
import { formatQuantity } from "../helpers/formatQuantity";

export default function Products() {
  const { data: locations = [], error: locationsError } = useLocations();
  const { data,  error: productsError } = useAdminProducts();
 
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const columns: Column<Product>[] = [
    { key: "name", header: "Producto" },
    { key: "unitType", header: "Unidad", render: (value) => formatUnitType(value as string)},
    {
      key: "quantity",
      header: "Cantidad",
      render: (_, row) => formatQuantity(row.quantity, row.quantityUnit),
    },
    { key: "category", header: "Categoría", render: (value) => formatCategory(value as string), },
    { key: "subcategory", header: "Subcategoría", render: (value) => formatSubcategory(value as string), },
  ];

  const filteredData = useMemo(() => {
    if (!data?.products) return [];

    return data.products.filter((p: any) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

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
