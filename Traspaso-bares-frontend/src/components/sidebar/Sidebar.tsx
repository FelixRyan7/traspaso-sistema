import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { logoutUser } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";
import { sidebarItems } from "./sidebar.config"
import { isMenuActive } from "../../helpers/isMenuActive";


export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate()
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
 
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
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl text-primary-strong  text-center"
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-2 space-y-2 mt-2">
        {allowedItems.map((item) => {
          const hasChildren = item.children?.length;

          if (!hasChildren) {
            return (
              <NavLink
                key={item.label}
                to={item.to!}
                end
                onClick={() => setOpenMenu(null)}
                className={
                  `
                  flex items-center gap-3 p-2 rounded-md
                  transition-colors
                  hover:bg-primary-strong hover:text-white no-underline
                  ${isMenuActive(item, location.pathname) ? "bg-primary-strong text-white" : ""}
                `
                }
              >
                <span
                      className="flex items-center justify-center w-10">
                  {item.icon}
                </span>

                {!collapsed && (
                  <span className="text-sm">{item.label}</span>
                )}
              </NavLink>
            );
          }

          return (
            <div
             key={item.label}
             className="relative"
            >
              <button
               onClick={() =>
               setOpenMenu(prev =>
                   prev === item.label ? null : item.label
                )
                }
                className={`
                  w-full flex items-center gap-3 p-2 rounded-md
                  transition-colors text-primary
                  hover:bg-primary-strong hover:text-white
                  ${isMenuActive(item, location.pathname) ? "bg-primary-strong text-white" : ""}
                `}
              >
                <span className="flex items-center justify-center w-10">
                  {item.icon}
                </span>

                {!collapsed && (
                  <>
                    <span className="text-sm flex-1 text-left">
                      {item.label}
                    </span>
                  </>
                )}
              </button>

                {/* SUBMENU NORMAL */}
              {openMenu === item.label && (
                <div
                  onClick={() =>
                   setOpenMenu(prev =>
                   prev === item.label ? null : item.label
                )
                }
                  className="
                   absolute top-0 left-full ml-3
                   z-50
                   flex flex-col
                   min-w-40
                   overflow-hidden
                   rounded-3xl
                   border border-gray-light
                   bg-primary-soft
                   shadow-xl
                  "
                >
                  {item.children!.map((child) => (
    
                    <NavLink
                      key={child.label}
                      to={child.to!}
                      className={({ isActive }) => `
                      flex items-center gap-2
                      px-4 py-3
                      no-underline
                      transition-colors duration-200
                      hover:bg-primary-strong hover:text-white
                      ${isActive ? "bg-primary-strong text-white" : ""}
                      `}
                    >
      
                      {child.icon}
                      <span className="text-sm font-medium">{child.label}</span>
      
                    </NavLink>
    
                  ))}
                </div>
              )}
      </div>
      );
      })}
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