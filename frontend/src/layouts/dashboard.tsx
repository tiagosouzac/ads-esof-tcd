import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/sidebar";
import { useNavigation } from "@/hooks/use-navigation";
import { AppSidebar } from "@/partials/app-sidebar";
import { LayoutDashboard } from "lucide-react";
import { Link, Outlet } from "react-router";
import { Fragment } from "react";

function DashboardLayout() {
  const { breadcrumb } = useNavigation();

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

                {breadcrumb.length > 0 && <BreadcrumbSeparator />}

                {breadcrumb.map((item, index) => (
                  <Fragment key={item.label}>
                    <BreadcrumbItem>
                      {item.url ? (
                        <BreadcrumbLink className="line-clamp-1" asChild>
                          <Link to={item.url}>{item.label}</Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="line-clamp-1">
                          {item.label}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>

                    {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
                  </Fragment>
                ))}
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
