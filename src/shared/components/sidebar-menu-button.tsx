"use client";

import { SidebarMenuButton } from "@/shared/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  url: string;
};

const SidebarMenuButtonClient = ({ url, children }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <SidebarMenuButton isActive={isActive} asChild>
      {children}
    </SidebarMenuButton>
  );
};

export default SidebarMenuButtonClient;
