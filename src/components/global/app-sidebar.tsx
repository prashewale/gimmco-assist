"use client";

import * as React from "react";
import { ArrowUpCircleIcon } from "lucide-react";

import { NavDocuments } from "@/components/global/nav-documents";
import { NavMain } from "@/components/global/nav-main";
import { NavSecondary } from "@/components/global/nav-secondary";
import { NavUser } from "@/components/global/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { sidebarData } from "@/data/sidebar-data";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "@/lib/types";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const authUser = useAuthUser<User>();

  const userToDisplay = {
    name: authUser?.firstName + " " + authUser?.lastName,
    email: authUser?.email,
    avatar:
      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Gimmco Assist</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
        <NavDocuments items={sidebarData.documents} />
        <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userToDisplay} />
      </SidebarFooter>
    </Sidebar>
  );
}
