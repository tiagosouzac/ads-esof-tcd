import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  // BreadcrumbSeparator,
  // BreadcrumbPage,
} from "@/components/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/sidebar";
import { AppSidebar } from "@/partials/app-sidebar";
import { LayoutDashboard } from "lucide-react";
import { Link, Outlet } from "react-router";

function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link className="flex items-center gap-2" to="/">
                      <LayoutDashboard size={16} />
                      Início
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {/* <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem> */}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export { DashboardLayout };
