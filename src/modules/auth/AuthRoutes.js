import { Routes, Route } from "react-router-dom";
import LogoutAdminPage from "./admin/LogoutAdminPage";
import LoginAdminPage from "./admin/LoginAdminPage";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="*" element={<LoginAdminPage />} />
      <Route path="/login" element={<LoginAdminPage />} />
      <Route path="/logout" element={<LogoutAdminPage />} />
    </Routes>
  );
}
