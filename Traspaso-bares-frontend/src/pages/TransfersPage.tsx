import { useMemo, useState } from "react";
import TransferFilters from "../components/transfers/TransferFilters";
import { useSearchParams } from "react-router-dom";
import { useLocations } from "../hooks/PosHooks/useLocations";
import { useLocationTransfersByDate } from "../hooks/orderHooks/useLocationTransfersByDate";
import TransferList from "../components/transfers/TransferMovementPanel";
import { useLocationTransfersSummary } from "../hooks/orderHooks/useLocationTransfersSummary";
import TransferSummary from "../components/transfers/TransferProductPanel";
import TransferHeader from "../components/transfers/TransferHeader";
import { useWorkspaceLocation } from "../hooks/PosHooks/useLocation";

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
    console.log(location)

  const today = new Date().toISOString().split("T")[0];

  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);

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

  const handleSearch = async () => {
    await Promise.all([
      refetchTransfers(),
      refetchSummary(),
    ]);
  };

  const handleCreateTransfer = () => {
    console.log("sklefhs");
  };

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

  return (
    <div className="flex h-full min-h-0 flex-col gap-6">
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
        onCreateTransfer={handleCreateTransfer}
      />
      <TransferHeader
        from={from}
        to={to}
        locationName={location?.name}
        movementsCount={movementsCount}
        deliveredUnits={deliveredUnits}
      />

      <div className="mt-6 flex-1 min-h-0 grid xl:grid-cols-12 gap-6 items-stretch">

        <div className="xl:col-span-4 xl:sticky xl:top-6 xl:self-start h-full">
          <TransferSummary
            summary={summary}
            loading={summaryLoading}
            error={summaryErrors}
            from={from}
            to={to}
            selectedProductIds={selectedProductIds}
            onProductSelect={setSelectedProductIds}
            onClearFilter={() => setSelectedProductIds([])}
          />
        </div>

        <div className="xl:col-span-8 h-full min-h-0">
         <TransferList
          transfers={visibleTransfers}
            loading={transfersLoading}
            error={transfersErrors}
            summary={summary}
            selectedProductIds={selectedProductIds}
            onClearFilter={() => setSelectedProductIds([])}
          />
        </div>
      </div>
    </div>
  );

}