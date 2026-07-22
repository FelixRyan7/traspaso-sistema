import { useTogglePos } from "../../hooks/PosHooks/useTogglePos";
import type { Location } from "../../types/location";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { useNavigate } from "react-router-dom";

type Props = {
  location: Location;
  onEdit: (location: Location) => void;
  onClose: () => void;
};

export default function LocationCardMenu({ location, onClose, onEdit }: Props) {
  const { mutate: togglePos, isPending } = useTogglePos();
  const navigate = useNavigate()

  return (
    <div
      className="
        absolute right-0 mt-2 z-20
        w-56
        bg-white/90 backdrop-blur-md
        border border-gray-light/60
        rounded-xl
        shadow-lg
        overflow-hidden
      "
    >
      <button
        onClick={() => {
          onClose();
          navigate(`/workspace/transfers?locationId=${location.id}`);
        }}
        className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-gray-light/50 transition"
      >
        <CalendarMonthOutlinedIcon fontSize="small" />
        Gestion de traspasos
      </button>

      

      <button
        onClick={() => {
          onEdit(location);
        }}
        className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-gray-light/50 transition"
      >
        <EditOutlinedIcon fontSize="small" />
        Editar location
      </button>

      <div className="mx-2 my-1 border-t border-gray-light/70" />

      <button
        onClick={() => {
          togglePos(location.id);
          onClose();
        }}
        disabled={isPending}
        className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-gray-light/50 transition"
      >
        <ToggleOffIcon fontSize="small" />
        {isPending
          ? "Actualizando..."
          : location.isActive
          ? "Desactivar"
          : "Activar"}
      </button>

    </div>
  );
}