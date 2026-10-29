import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types";

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items?.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        icon: item?.icon,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        icon: item?.icon,
        children: item.children.map((child) => ({
          key: child.name,
          icon: child?.icon,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
