import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined';

export type SidebarItem = {
  label: string;
  to: string;
  icon: React.ReactNode;
  roles: string[];
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
    icon: <StorefrontOutlinedIcon  />,
    roles: ["admin", "manager"],
  },
  {
    label: "Transfers",
    to: "/workspace/transfers",
    icon: <ViewModuleOutlinedIcon  />,
    roles: ["admin", "manager"],
  },
];