import Logo from "@/shared/components/logo";
import { NavUser } from "@/shared/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import { MENU_ITEMS } from "@/shared/constants/menu";
import { createSupabaseServerClient } from "@/shared/lib/supabase/server";
import Link from "next/link";

export async function AppSidebar() {
  const supabase = await createSupabaseServerClient();
  const authUser = await supabase.auth.getUser();

  const user = authUser.data.user;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Logo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Finance</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.user_metadata?.full_name ?? "Anonymous",
            email: user?.email ?? "Anonymous",
            avatar: user?.user_metadata?.avatar_url ?? "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
