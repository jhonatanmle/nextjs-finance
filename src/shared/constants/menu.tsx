import { Coins, Home } from "lucide-react";

export interface SidebarMenuButtonProps {
  title: string;
  url: string;
  icon: React.ComponentType;
}

export const MENU_ITEMS = [
  {
    title: "Dashboard",
    url: "/home/dashboard",
    icon: Home,
  },
  {
    title: "Transacciones",
    url: "/home/transactions",
    icon: Coins,
  },
];
