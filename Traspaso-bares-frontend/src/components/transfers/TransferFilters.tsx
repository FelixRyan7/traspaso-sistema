import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SelectFloatingRHF from "../ui/Inputs/SelectInput";
import InputFloatingRHF from "../ui/Inputs/FloatingInput";
import { Button } from "../ui/Buttons/Button";

type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  locations: SelectOption[];

  locationId?: number;
  from: string;
  to: string;
  canSearch: boolean;

  onLocationChange: (locationId: number) => void;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;

  onSearch: () => void;
};

export default function TransferFilters({
  locations,
  locationId,
  from,
  to,
  canSearch,
  onLocationChange,
  onFromChange,
  onToChange,
  onSearch,
}: Props) {

  const today = new Date().toISOString().split("T")[0];
  
  return (
    <div
      className="
        rounded-2xl
        bg-white-soft
        shadow-sm
        p-6
      "
    >
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-5
          gap-5
          items-end
        "
      >
        {/* LOCATION */}
        <SelectFloatingRHF
          id="location"
          label="Ubicacion"
          value={locationId?.toString()}
          onChange={(value) => onLocationChange(Number(value))}
          options={locations.map((location) => ({
            value: location.value.toString(),
            label: location.label,
          }))}
        />

        {/* FROM */}
        <InputFloatingRHF
          id="from"
          label="Desde"
          type="date"
          value={from}
          onChange={onFromChange}
          max={to}
        />

        {/* TO */}
        <InputFloatingRHF
          id="to"
          label="Hasta"
          type="date"
          value={to}
          onChange={onToChange}
          min={from}
          max={today}
        />

        {/* ACTIONS */}
        <div className="xl:col-span-2 flex justify-between sm:justify-end gap-3 pb-6">
          <Button
            onClick={onSearch}
            disabled={!canSearch}
            className="h-14"
          >
            <SearchOutlinedIcon fontSize="small" />
            Buscar
          </Button>

          <Button
            to="/workspace/scheduled-deliveries"
            variant="dark"
            className="h-14"
          >
            <AddOutlinedIcon fontSize="small" />
            Nuevo traspaso
          </Button>
        </div>
      </div>
    </div>
  );
}