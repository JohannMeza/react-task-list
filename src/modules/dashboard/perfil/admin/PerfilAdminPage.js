import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";

export default function PerfilAdminPage() {
  const { user, isAuthenticated } = useAuth0();
  return (
    <Box sx={{display: "flex", justifyContent: "center"}}>
      {isAuthenticated && (
        <Box sx={{ marginTop: 10, textAlign: "center" }}>
          <img src={user.picture} alt="Mi Perfil" />
          <h3>{user.name}</h3>
        </Box>
      )}
    </Box>
  );
}
