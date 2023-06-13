import { Routes, Route } from "react-router-dom";
import PerfilAdminPage from "./admin/PerfilAdminPage";

export default function PerfilRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<PerfilAdminPage />} />
    </Routes>
  );
}
