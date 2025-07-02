// import { AppSidebar } from "@/shared/components/app-sidebar";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/shared/components/ui/sidebar";
import { getUserWallet } from "@/features/stock-events/actions";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Prefetch user wallet data at layout level
  await getUserWallet();
  return (
    // <SidebarProvider>
    //   <AppSidebar />
    //   <SidebarInset>
    //     <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
    //       <div className="flex items-center gap-2 px-4">
    //         <SidebarTrigger className="-ml-1" />
    //       </div>
    //     </header>
    //     <main className="p-4">{children}</main>
    //   </SidebarInset>
    // </SidebarProvider>
    <main className="p-4">{children}</main>
  );
}
