import { useNavigation } from "@/hooks/use-navigation";
import { useEffect } from "react";

function Dashboard() {
  const { setBreadcrumb } = useNavigation();

  useEffect(() => {
    setBreadcrumb([]);
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export { Dashboard };
