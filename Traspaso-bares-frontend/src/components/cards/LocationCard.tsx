import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

import { useState } from "react";
import type { Location } from "../../types/location";
import LocationCardMenu from "../menus/LocationCardMenu";

type Props = {
  location: Location;
  onEdit: (location: Location) => void;
};

export default function LocationCard({ location, onEdit }: Props) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div
      className={`relative rounded-2xl
        ${openMenu ? "z-50" : ""}
        bg-white-soft
        p-5 shadow-sm
        transition-all duration-200
        hover:shadow-md `}      
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
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpenMenu(false)}
            />

            <LocationCardMenu
              location={location}
              onEdit={onEdit}
              onClose={() => setOpenMenu(false)}
            />
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
