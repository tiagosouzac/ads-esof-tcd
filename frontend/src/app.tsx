import { Route, Routes } from "react-router";
import { DashboardLayout } from "@/layouts/dashboard";
import { Dashboard } from "@/pages/dashboard";
import { Employees } from "@/pages/employees";
import { Projects } from "@/pages/projects";
import { Login } from "@/pages/login";

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="projects" element={<Projects />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export { App };
