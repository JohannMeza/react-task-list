import { Routes, Route } from "react-router-dom";
import TareasAdminPage from "./admin/TareasAdminPage";

export default function TareasRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<TareasAdminPage />} />
    </Routes>
  );
}
