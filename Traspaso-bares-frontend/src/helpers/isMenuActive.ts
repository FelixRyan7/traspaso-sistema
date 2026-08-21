import type { SidebarItem } from "../components/sidebar/sidebar.config";

export const isMenuActive = (
  item: SidebarItem,
  pathname: string
) => {
  if (item.to) {
    return pathname === item.to;
  }

  return item.children?.some((child) =>
    pathname.startsWith(child.to || "")
  );
};