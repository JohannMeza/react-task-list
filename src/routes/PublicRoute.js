import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { PRIVATE_PATH } from "../constants/PathConstants";

export default function PublicRoute (props) {
  const { isAuthenticated } = useAuth0()
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate(PRIVATE_PATH.TAREAS_ADMIN)
  }, [isAuthenticated, navigate])
  return <Routes><Route {...props} /></Routes>
}