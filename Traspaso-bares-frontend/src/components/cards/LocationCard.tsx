import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

import { useState } from "react";
import { useTogglePos } from "../../hooks/PosHooks/useTogglePos";

type Props = {
  location: any;
};

export default function LocationCard({ location }: Props) {
  const [openMenu, setOpenMenu] = useState(false);

  const { mutate: togglePos, isPending } = useTogglePos();

  return (
    <div
      className="
        relative rounded-2xl
        bg-white/80 backdrop-blur-md
        border border-gray-light/60
        p-5 shadow-sm
        transition-all duration-200
        hover:shadow-md hover:-translate-y-0.5
      "
    >
      {/* ACTIONS */}
      <div className="absolute top-3 right-3">
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="
            p-2 rounded-lg
            hover:bg-gray-light/60
            transition
          "
        >
          <MoreVertOutlinedIcon />
        </button>

        {openMenu && (
          <>
            {/* BACKDROP */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpenMenu(false)}
            />

            {/* MENU */}
            <div
              className="
                absolute right-0 mt-2 z-20
                w-44
                bg-white/90 backdrop-blur-md
                border border-gray-light/60
                rounded-xl
                shadow-lg
                overflow-hidden
              "
            >
              <button
                onClick={() => togglePos(location.id)}
                disabled={isPending}
                className="
                  w-full text-left px-4 py-2
                  text-sm
                  hover:bg-gray-light/50
                  transition
                "
              >
                {isPending ? "Actualizando..." : location.isActive ? "Desactivar" : "Activar"}
              </button>
            </div>
          </>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className="
            w-12 h-12 rounded-xl
            bg-primary-soft/60
            flex items-center justify-center
            shadow-inner
          "
        >
          <StorefrontOutlinedIcon className="text-primary" />
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-base text-gray-900 truncate">
            {location.name}
          </h3>

          <p className="text-sm text-gray-500 capitalize">
            {location.type}
          </p>
        </div>
      </div>

      {/* STATUS */}
      <div className="flex items-center justify-between">
        <span
          className={`
            px-3 py-1 rounded-full text-xs font-medium
            transition
            ${
              location.isActive
                ? "bg-success-soft text-success"
                : "bg-error-soft text-error"
            }
          `}
        >
          {location.isActive ? "Activo" : "Inactivo"}
        </span>

        {/* subtle indicator dot */}
        <div
          className={`
            w-2 h-2 rounded-full
            ${location.isActive ? "bg-success" : "bg-error"}
          `}
        />
      </div>
    </div>
  );
}
