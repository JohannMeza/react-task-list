import React, { createContext, useEffect, useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const AuthContext = createContext();

export default function AuthContextProvider ({children}) {
  const {isAuthenticated, loginWithRedirect, isLoading} = useAuth0();

  const handleSignIn = () => {
    if (isAuthenticated) return;
    else if (!isLoading) loginWithRedirect()
  }

  const value = useMemo(() => ({handleSignIn}), [])
  useEffect(() => handleSignIn(), [isAuthenticated, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}