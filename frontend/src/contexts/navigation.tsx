import { createContext, PropsWithChildren, useState } from "react";
import { useLocation } from "react-router";

interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbContext {
  breadcrumb: BreadcrumbItem[];
  setBreadcrumb: (items: BreadcrumbItem[]) => void;
  currentPath: string;
}

const NavigationContext = createContext({} as BreadcrumbContext);

function NavigationProvider({ children }: PropsWithChildren) {
  const location = useLocation();
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>([]);
  const currentPath = location.pathname;

  return (
    <NavigationContext.Provider
      value={{
        breadcrumb,
        setBreadcrumb,
        currentPath,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export { NavigationContext, NavigationProvider };
