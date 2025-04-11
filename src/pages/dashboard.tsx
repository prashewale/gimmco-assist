import axios from "axios";

import { AppSidebar } from "@/components/global/app-sidebar";
import { ChartAreaInteractive } from "@/components/global/chart-area-interactive";
import { DataTable } from "@/components/global/data-table";
import { SectionCards } from "@/components/global/section-cards";
import { SiteHeader } from "@/components/global/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "@/data/data.json";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <SectionCards /> */}
              <DataTable data={data} />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
