import SearchOutlinedIcon from "@mui/icons-material/Search";
import SelectFloatingRHF from "../../ui/Inputs/SelectInput";
import InputFloatingRHF from "../../ui/Inputs/FloatingInput";
import { Button } from "../../ui/Buttons/Button";

type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  locations: SelectOption[];

  locationId?: number;
  deliveryDate: string;

  canSearch: boolean;

  onLocationChange: (locationId: number) => void;
  onDeliveryDateChange: (date: string) => void;
  onSearch: () => void;
};

export default function ScheduledDeliveryFilters({
  locations,
  locationId,
  deliveryDate,
  canSearch,
  onLocationChange,
  onDeliveryDateChange,
  onSearch,
}: Props) {

    const today = new Date().toISOString().split("T")[0];
    return (
        <div className="rounded-2xl bg-white-soft shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
                <SelectFloatingRHF
                    id="location"
                    label="Ubicación"
                    value={locationId?.toString()}
                    onChange={(value:any) => onLocationChange(Number(value))}
                    options={locations}
                />

                <InputFloatingRHF
                    id="deliveryDate"
                    label="Fecha de entrega"
                    type="date"
                    max={today}
                    value={deliveryDate}
                    onChange={onDeliveryDateChange}
                />

                <div className="flex justify-end pb-6">
                    <Button
                        onClick={onSearch}
                        disabled={!canSearch}
                        className="h-14"
                    >
                      <SearchOutlinedIcon fontSize="small" />
                      Cargar productos
                    </Button>
                </div>
            </div>
        </div>
  );
}