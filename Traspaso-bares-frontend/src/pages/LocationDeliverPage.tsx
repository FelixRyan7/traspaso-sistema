import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";

import { AlertList } from '../components/ui/Alerts/AlertList';
import { useAlerts } from '../hooks/alerts/useAlerts';
import { useLocationProducts, type LocationProductItem } from '../hooks/orderHooks/useLocationProduct';
import LocationDeliverCard from '../components/cards/LocationDeliverCard';
import { useCreateDirectDelivery } from "../hooks/orderHooks/useCreateDirectDelivery";

import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import SubcategoryFilter from "../components/ui/Filters/SubcategoryFilter";
import SearchBar from "../components/ui/Filters/SearchBar";
import { SUBCATEGORY_OPTIONS } from "../constants/products";

export default function LocationDirectDeliverPage() {
  const { locationId } = useParams();
  const { data = [], isLoading, error } = useLocationProducts(Number(locationId));

  const { alerts, pushAlert, removeAlert } = useAlerts();

  const [search, setSearch] = useState("");
  const [activeSubcategory, setActiveSubcategory] = useState("all");

  const filteredProducts = useMemo(() => {
    return data.filter((p) => {
      const matchesSearch =
        search.trim() === "" ||
        p.name.toLowerCase().includes(search.toLowerCase());

      const matchesSubcategory =
        activeSubcategory === "all" ||
        p.subcategory === activeSubcategory;

      return matchesSearch && matchesSubcategory;
    });
  }, [data, search, activeSubcategory]);

  const createDirectDelivery = useCreateDirectDelivery();

  const handleDeliver = async (product: LocationProductItem, qty: number) => {
     try {
    await createDirectDelivery.mutateAsync({
      locationId: Number(locationId),
      productId: product.productId,
      quantity: qty,
    });

    pushAlert({
      type: "success",
      content: ` ${product.name} × ${qty} entregado`,
      icon: <DoneAllOutlinedIcon />,
    });

  } catch {
    pushAlert({
      type: "error",
      content: `Error al entregar ${product.name}`,
      icon: <ReportProblemOutlinedIcon />,
    });
  }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error cargando productos</p>;

  return (
    <div className="p-4 space-y-4">
      <AlertList messages={alerts} onClose={removeAlert} floating />

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-dark">
          Entrega directa
        </h1>

        <p className="text-sm text-gray mt-1">
          Selecciona productos para registrar entrega inmediata
        </p>
      </div>

      {/* SEARCH */}
      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <SubcategoryFilter
        options={SUBCATEGORY_OPTIONS}
        value={activeSubcategory}
        onChange={setActiveSubcategory}
      />

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <LocationDeliverCard
            key={product.productId}
            product={product}
            onDeliver={handleDeliver}
          />
        ))}
      </div>
    </div>
  );
}
