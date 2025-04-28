import { useContext } from "react";
import { NavigationContext } from "@/contexts/navigation";

function useNavigation() {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error("useNavigation must be used within an NavigationProvider");
  }

  return context;
}

export { useNavigation };
