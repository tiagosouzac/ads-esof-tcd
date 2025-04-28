import { useNavigation } from "@/hooks/use-navigation";
import { useEffect } from "react";

function Projects() {
  const { setBreadcrumb } = useNavigation();

  useEffect(() => {
    setBreadcrumb([{ label: "Projetos" }]);
  }, []);

  return (
    <div>
      <h1>Projetos</h1>
    </div>
  );
}

export { Projects };
