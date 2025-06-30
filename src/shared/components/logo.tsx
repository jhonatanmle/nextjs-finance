'use client';

import { SidebarMenuButton, useSidebar } from '@/shared/components/ui/sidebar';
import Image from 'next/image';

const Logo = () => {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      <Image src="/logo.svg" width={24} height={24} alt="Logo" />
      {!isMobile && <h4 className="text-xl font-medium">Finance</h4>}
    </SidebarMenuButton>
  );
};

export default Logo;
