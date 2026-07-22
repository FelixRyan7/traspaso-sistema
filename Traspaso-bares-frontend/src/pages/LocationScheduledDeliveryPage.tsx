import { useMemo, useState } from "react";

import ScheduledDeliveryFilters from "../components/transfers/delivery/ScheduledDeliveryFilters";
import { useLocations } from "../hooks/PosHooks/useLocations";
import { useLocationProducts, type LocationProductItem } from "../hooks/orderHooks/useLocationProduct";
import LocationDeliverCard from "../components/cards/LocationDeliverCard";
import { useCreateDelivery } from "../hooks/orderHooks/useCreateDelivery";
import { useAlerts } from "../hooks/alerts/useAlerts";

import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import { AlertList } from "../components/ui/Alerts/AlertList";


export default function LocationScheduledDeliveryPage() {
  const today = new Date().toISOString().split("T")[0];

  const [locationId, setLocationId] = useState<number>();
  const [hasSearched, setHasSearched] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(today);
  const { alerts, pushAlert, removeAlert } = useAlerts();

  const { data: locations = [] } = useLocations();
  const { data: products = [], isLoading, error, refetch} = useLocationProducts(locationId ?? 0);
  
  const locationOptions = useMemo(
    () =>
      locations.map((location) => ({
        value: location.id.toString(),
        label: location.name,
      })),
    [locations]
  );

  const canSearch = !!locationId && deliveryDate !== "";

    const handleSearch = async () => {
        await refetch();
        setHasSearched(true);
        console.log(locationId, deliveryDate);
    };
    const handleLocationChange = (id: number) => {
        setLocationId(id);
        setHasSearched(false);
    };

    const createDelivery = useCreateDelivery();

    const handleDeliver = async (
        product: LocationProductItem,
        qty: number
    ) => {
        try {
            console.log(locationId)
            console.log(product.productId)
            console.log(qty)
            console.log(deliveryDate)
            await createDelivery.mutateAsync({
                locationId: Number(locationId),
                productId: product.productId,
                quantity: qty,
                deliveryDate,
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

  return (
    <>
    <AlertList messages={alerts} onClose={removeAlert} floating />
    <ScheduledDeliveryFilters
      locations={locationOptions}
      locationId={locationId}
      deliveryDate={deliveryDate}
      canSearch={canSearch}
      onLocationChange={handleLocationChange}
      onDeliveryDateChange={setDeliveryDate}
      onSearch={handleSearch}
    />
    {hasSearched && (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {products.map((product) => (
              <LocationDeliverCard
                key={product.productId}
                product={product}
                onDeliver={handleDeliver}
              />
            ))}
          </div>
    )}
    </>
  );
}
