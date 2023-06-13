import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import { useAuth0 } from '@auth0/auth0-react';
import { PUBLIC_PATH } from '../constants/PathConstants';

export default function PrivateRoute (props) {
  const { isAuthenticated } = useAuth0()
  const navigate = useNavigate()
  
  useEffect(() => {
    !isAuthenticated && navigate(PUBLIC_PATH.LOGIN)
  }, [isAuthenticated, navigate])

  return (
    <Routes>
      <Route {...props} />
    </Routes> 
  )
}