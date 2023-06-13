import { Routes, Route } from "react-router-dom";
import TareasRoutes from "./Tareas/TareasRoutes";
import HeaderComponents from "../../components/layout/HeaderComponente";
import PerfilRoutes from "./perfil/PerfilRoutes";
import { Box } from "@mui/material";

export default function DashboardRoutes() {
  return (
    <Box sx={{ height: "100vh", display: "grid", gridTemplateRows: "auto 1fr" }}>
      <HeaderComponents />
      <Box>
        <Routes>
          <Route path="/tareas/*" element={<TareasRoutes />} />
          <Route path="/perfil/*" element={<PerfilRoutes />} />
        </Routes>
      </Box>
    </Box>
  );
}
