import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AuthRoutes from '../modules/auth/AuthRoutes';
import DashboardRoutes from '../modules/dashboard/DashboardRoutes';
import PublicRoute from './PublicRoute';

export default function IndexRoute () {
  return (
    <Routes>
      <Route path={"/dashboard/*"} element={<PrivateRoute path="*" element={<DashboardRoutes />} />} />
      <Route path={"*"} element={<PublicRoute path="*" element={<AuthRoutes />} /> } />
    </Routes>
  )
}