import { NavLink, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { logoutUser } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";
import { sidebarItems } from "./sidebar.config";
import { useState } from "react";

import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { isMenuActive } from "../../helpers/isMenuActive";

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileSidebar({
  open,
  onClose,
}: MobileSidebarProps) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>("Traspasos");
  const user = useAuthStore((state) => state.user);
    const allowedItems = sidebarItems.filter((item) =>
      item.roles.includes(user?.role || "")
    );

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 md:hidden
        transition-all duration-300
        ${open ? "visible bg-black/40" : "invisible"}
      `}
      onClick={onClose}
    >
      {/* SIDEBAR */}
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`
          h-full w-[90%] max-w-sm
          bg-primary-soft/90 backdrop-blur-sm  text-white-soft
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-gray-light">
          <span className="text-lg font-bold text-primary-strong">
            Traspaso
          </span>

          <button
            onClick={onClose}
            className="text-primary-strong"
          >
            <CloseIcon />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-2 space-y-2 mt-4">
  {allowedItems.map((item) => {
    const hasChildren = item.children?.length;

    if (!hasChildren) {
      return (
        <NavLink
          key={item.label}
          to={item.to!}
          end
          onClick={onClose}
          className={({ isActive }) =>
            `
            flex items-center gap-3 p-3 rounded-md
            transition-colors no-underline
            hover:bg-primary-strong hover:text-white
            ${isActive ? "bg-primary-strong text-white" : ""}
          `
          }
        >
          <span className="w-10 flex justify-center">
            {item.icon}
          </span>

          <span className="text-sm">
            {item.label}
          </span>
        </NavLink>
      );
    }

    return (
      <div key={item.label}>
        <button
          onClick={() =>
            setExpanded(
              expanded === item.label
                ? null
                : item.label
            )
          }
          className={`
            w-full flex items-center gap-3 p-3 rounded-md text-primary no-underline
            transition-colors
            hover:bg-primary-strong hover:text-white
            ${
              isMenuActive(item, location.pathname)
                ? "bg-primary-strong text-white"
                : ""
            }
          `}
        >
          <span className="w-10 flex justify-center">
            {item.icon}
          </span>

          <span className="flex-1 text-left text-sm">
            {item.label}
          </span>

          {expanded === item.label ? (
            <KeyboardArrowDownOutlinedIcon />
          ) : (
            <KeyboardArrowRightOutlinedIcon />
          )}
        </button>

        {expanded === item.label && (
          <div className="ml-10 mt-1 space-y-1">
            {item.children!.map((child) => (
              <NavLink
                key={child.label}
                to={child.to!}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3 p-3 rounded-md
                  transition-colors no-underline
                  hover:bg-primary-strong hover:text-white
                  ${
                    isActive
                      ? "bg-primary-strong text-white"
                      : ""
                  }
                `
                }
              >
                <span className="w-8 flex justify-center">
                  {child.icon}
                </span>

                <span className="text-sm">
                  {child.label}
                </span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  })}
</nav>

        {/* FOOTER */}
        <div className="mt-auto px-2 pb-4">
          <button
            onClick={handleLogout}
            className="
              w-full flex items-center gap-3 p-3 rounded-md
              transition-colors text-primary-strong
              hover:bg-primary-strong hover:text-white
            "
          >
            <span className="flex items-center justify-center w-10">
              <LogoutOutlinedIcon />
            </span>

            <span className="text-sm">
              Cerrar sesión
            </span>
          </button>
        </div>
      </aside>
    </div>
  );
}