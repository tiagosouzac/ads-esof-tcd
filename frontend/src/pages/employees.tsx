import { useNavigation } from "@/hooks/use-navigation";
import { useEffect } from "react";

function Employees() {
  const { setBreadcrumb } = useNavigation();

  useEffect(() => {
    setBreadcrumb([{ label: "Funcionários" }]);
  }, []);

  return (
    <div>
      <h1>Funcionários</h1>
    </div>
  );
}

export { Employees };
