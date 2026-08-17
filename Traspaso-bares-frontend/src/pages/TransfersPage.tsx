import { useMemo, useState } from "react";
import TransferFilters from "../components/transfers/TransferFilters";
import { useSearchParams } from "react-router-dom";
import { useLocations } from "../hooks/PosHooks/useLocations";
import { useLocationTransfersByDate } from "../hooks/orderHooks/useLocationTransfersByDate";
import TransferMovementPanel from "../components/transfers/TransferMovementPanel";
import { useLocationTransfersSummary } from "../hooks/orderHooks/useLocationTransfersSummary";
import TransferSummary from "../components/transfers/TransferProductPanel";
import TransferHeader from "../components/transfers/TransferHeader";
import { useWorkspaceLocation } from "../hooks/PosHooks/useLocation";
import { Button } from "../components/ui/Buttons/Button";

export default function TransfersPage() {
  const [searchParams] = useSearchParams();

  const initialLocation = searchParams.get("locationId")
    ? Number(searchParams.get("locationId"))
    : undefined;

  const [locationId, setLocationId] = useState<number | undefined>(
    initialLocation
  );

  const { data: location } = useWorkspaceLocation(
      Number(locationId)
  );

  const today = new Date().toISOString().split("T")[0];

  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);
  const [hasSearched, setHasSearched] = useState(false);

  const canSearch =
    locationId !== undefined && from !== "" && to !== "";

  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  const {
    data: locations = [],
  } = useLocations();

  const locationOptions = useMemo(
    () =>
      locations.map((location) => ({
        value: location.id.toString(),
        label: location.name,
      })),
    [locations]
  );

  const {
    data: transfers = [],
    isLoading: transfersLoading,
    error: transfersErrors,
    refetch: refetchTransfers,
  } = useLocationTransfersByDate(locationId, from, to);

  const {
    data: summary = [],
    isLoading: summaryLoading,
    error: summaryErrors,
    refetch: refetchSummary,
  } = useLocationTransfersSummary(locationId, from, to);

  const visibleTransfers =
  selectedProductIds.length === 0
    ? transfers
    : transfers.filter((t) =>
        selectedProductIds.includes(t.productId)
      );
  
  const movementsCount = visibleTransfers.length;

  const deliveredUnits = visibleTransfers.reduce(
    (sum, transfer) => sum + transfer.quantity,
    0
  );

  const [showAllTransfers, setShowAllTransfers] = useState(false);
  const shouldShowTransfers = showAllTransfers || selectedProductIds.length > 0;


  const handleSearch = async () => {
    await Promise.all([
      refetchTransfers(),
      refetchSummary(),
    ]);
    setHasSearched(true);
    setShowAllTransfers(false);
    setSelectedProductIds([]);
  };



  return (
  <div className="flex h-full min-h-0 flex-col gap-6 p-6">
    <h2 className="text-xl ml-4 font-bold text-dark">
      Traspasos <span className="text-primary">{location?.name}</span>  
    </h2>
    <TransferFilters
      locations={locationOptions}
      locationId={locationId}
      from={from}
      to={to}
      canSearch={canSearch}
      onLocationChange={setLocationId}
      onFromChange={setFrom}
      onToChange={setTo}
      onSearch={handleSearch}
    />

    {hasSearched && (
      <>

        <div className="mt-6 flex-1 min-h-0 grid lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-4 lg:sticky lg:top-6 lg:self-start h-full">
            <TransferSummary
              summary={summary}
              loading={summaryLoading}
              error={summaryErrors}
              from={from}
              to={to}
              deliveredUnits={deliveredUnits}
              selectedProductIds={selectedProductIds}
              onProductSelect={(ids) => {
                setSelectedProductIds(ids);

                // Si selecciona un producto mostramos automáticamente la lista
                if (ids.length > 0) {
                  setShowAllTransfers(false);
                }
              }}
              onClearFilter={() => setSelectedProductIds([])}
            />
          </div>

          <div className="lg:col-span-8 h-full min-h-0">
            {shouldShowTransfers ? (
              <TransferMovementPanel
                transfers={visibleTransfers}
                movementsCount={movementsCount}
                deliveredUnits={deliveredUnits}
                loading={transfersLoading}
                error={transfersErrors}
                summary={summary}
                selectedProductIds={selectedProductIds}
                onClearFilter={() => setSelectedProductIds([])}
              />
            ) : (
              <div className="flex h-full items-center justify-center rounded-3xl bg-white-soft shadow-sm">
                <div className="max-w-md text-center">
                  <h3 className="text-lg font-semibold text-dark">
                    Explora los movimientos
                  </h3>

                  <p className="mt-3 text-sm text-gray-dark">
                    Selecciona uno o varios productos del resumen para ver sus
                    movimientos o consulta el listado completo.
                  </p>

                  <Button
                    className="mt-6"
                    onClick={() => setShowAllTransfers(true)}
                  >
                    Ver todos los movimientos
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    )}
  </div>
);

}