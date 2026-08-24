import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined';
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export type SidebarItem = {
  label: string;
  to?: string;
  icon: React.ReactNode;
  roles: string[];
  children?: SidebarItem[];
};

export const sidebarItems: SidebarItem[] = [
  {
    label: "Workspace",
    to: "/workspace",
    icon: <SpaceDashboardOutlinedIcon />,
    roles: ["admin", "staff", "manager"],
  },
  {
    label: "Productos",
    to: "/workspace/admin/productos",
    icon: <FastfoodOutlinedIcon />,
    roles: ["admin", "manager"],
  },
  {
    label: "Ubicaciones",
    to: "/workspace/admin/pos",
    icon: <LocationOnOutlinedIcon  />,
    roles: ["admin", "manager"],
  },
  {
    label: "Traspasos",
    icon: <ViewModuleOutlinedIcon  />,
    roles: ["admin", "manager"],
    children: [
      {
        label: "Historial",
        to: "/workspace/transfers",
        icon: <ViewModuleOutlinedIcon />,
        roles: ["admin", "manager"],
      },
      {
        label: "Registrar",
        to: "/workspace/scheduled-deliveries",
        icon: <LocalShippingOutlinedIcon />,
        roles: ["admin", "manager"],
      },
    ],
  },
];