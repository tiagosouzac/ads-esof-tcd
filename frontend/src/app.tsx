import { Route, Routes } from "react-router";
import { Login } from "@/pages/login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export { App };
