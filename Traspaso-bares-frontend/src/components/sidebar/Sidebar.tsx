import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { logoutUser } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";
import { sidebarItems } from "./sidebar.config"


export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user);
  const allowedItems = sidebarItems.filter((item) =>
    item.roles.includes(user?.role || "")
  );
  const handleLogout = async () => {
    await logoutUser();
    navigate("/")
  };

  return (
    <>
    
    <aside
      className={`
        h-screen hidden bg-primary-soft text-white-soft
        md:flex flex-col transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* HEADER SIDEBAR */}
      <div className={`flex items-center p-4 border-b border-gray-light ${
        collapsed ? "justify-center" : "justify-between"
        }`
      }>
        {!collapsed && (
          <span className="text-lg font-bold text-primary-strong">
            Traspaso
          </span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl text-primary-strong  text-center"
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-2 space-y-2 mt-2">
        {allowedItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `
              flex items-center gap-3 p-2 rounded-md no-underline
              transition-colors
              hover:bg-primary-strong hover:text-white
              ${isActive ? "bg-primary-strong text-white" : ""}
              `
            }
          >
            <span className="flex items-center justify-center w-10">
              {item.icon}
            </span>

            {/* TEXTO SOLO SI NO ESTÁ COLAPSADO */}
            {!collapsed && (
              <span className="text-sm">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* FOOTER OPCIONAL */}
    <div className="mt-auto px-2 pb-3">
  <button
    onClick={handleLogout}
    className="
      w-full flex items-center gap-2 p-2 rounded-md no-underline
      transition-colors text-primary-strong
      hover:bg-primary-strong hover:text-white
    "
  >
    <span className="flex items-center justify-center w-10">
      <LogoutOutlinedIcon />
    </span>

    {!collapsed && (
      <span className="text-sm">Cerrar sesión</span>
    )}
  </button>
  </div>
    </aside>
</>
  );
}