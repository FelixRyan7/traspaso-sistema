import { useNavigate, useParams } from "react-router-dom";
import { useLocationProducts, type LocationProductItem } from "../hooks/orderHooks/useLocationProduct";
import { useMemo, useState } from "react";
import LocationProductCard from "../components/cards/LocationProductCard";
import { AlertList } from "../components/ui/Alerts/AlertList";
import { useCreateLocationRequest } from "../hooks/orderHooks/useCreateLocationRequest";

import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import { useAlerts } from "../hooks/alerts/useAlerts";
import { getApiError } from "../api/apiError";
import { useLocationRequests } from "../hooks/orderHooks/useLocationRequests";
import SubcategoryFilter from "../components/ui/Filters/SubcategoryFilter";
import SearchBar from "../components/ui/Filters/SearchBar";
import { SUBCATEGORY_OPTIONS } from "../constants/products";
import { useWorkspaceLocation } from "../hooks/PosHooks/useLocation";

export default function LocationListPage() {
  const { locationId } = useParams();
    const { data: location } = useWorkspaceLocation(
      Number(locationId)
    );
  const navigate = useNavigate()
  const { data, isLoading, error } = useLocationProducts(Number(locationId));
  const createLocationOrderItem = useCreateLocationRequest();
  
  
  const [search, setSearch] = useState("");
  const [activeSubcategory, setActiveSubcategory] = useState("all");

  const filteredProducts = useMemo(() => {
    if (!data) return [];

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

  // CHECK CURRENT ORDER
  const { data: requests = [] } = useLocationRequests(Number(locationId));
  const hasActiveRequests = (requests?.length ?? 0) > 0;
  const pendingQuantities = new Map(
    requests.map((request:any) => [request.productId, request.quantity])
  );

  // AÑADIR PRODUCTS
  const { alerts, pushAlert, removeAlert } = useAlerts();
  const [lastAddedProductId, setLastAddedProductId] = useState<number | null>(null);
  const handleAddProduct = async ( product: LocationProductItem, quantity: number) => 
    {
      try {
        await createLocationOrderItem.mutateAsync({
          locationId: Number(locationId),
          productId: product.productId,
          quantity,
          status: "pending",
        });

      setLastAddedProductId(product.productId);

      pushAlert({
        type: "success",
        content: `✓ ${product.name} × ${quantity} añadido`,
        icon: <DoneOutlinedIcon />
      });

      setTimeout(() => {
        setLastAddedProductId(null);
      }, 500);
      } catch (err) {
      pushAlert({
        type: "error",
        content: `Error al añadir ${product.name}`,
        icon: <ReportProblemOutlinedIcon/>
      });
      }
    };

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>{getApiError(error).message}</p>;

  return (
    <div className="p-4 space-y-4">
      <AlertList
        messages={alerts}
        onClose={removeAlert}
        floating
      /> 
      <h3 className="text-dark">Prepara la lista para <span className="font-bold">{location?.name}</span> </h3>
      { hasActiveRequests && (
        <div className="bg-primary/10 border border-primary text-primary rounded-xl px-4 py-2 flex justify-between items-center">
    
          <div>
            🧾 Lista activa
            <div className="text-xs opacity-70">
              {requests.length} productos añadidos
            </div>
          </div>

          <button
            onClick={() => {
              navigate(`/workspace/locations/${locationId}/requests`);
            }}
            className="font-semibold underline"
          >
            Ver lista →
          </button>

        </div>
      )}

      {/* 🔎 SEARCH */}
      <SearchBar value={search} onChange={setSearch} />

      {/* 🟦 PILLS */}
      <SubcategoryFilter
        options={SUBCATEGORY_OPTIONS}
        value={activeSubcategory}
        onChange={setActiveSubcategory}
      />

      {/* 📦 LISTA (placeholder por ahora) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <LocationProductCard
            key={product.productId}
            product={product}
            onAdd={handleAddProduct}
            showTick={lastAddedProductId === product.productId}
            addedQuantity={Number(pendingQuantities.get(product.productId) ?? 0)}
          />
        ))}
      </div>
    </div>
  );
}