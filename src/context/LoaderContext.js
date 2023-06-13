import React, { createContext, useCallback, useMemo, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const LoaderContext = createContext()

export default function LoadingPageProvider({children}) {
  const [loader, setLoader] = useState(false)
  const handleLoader = useCallback((value) => setLoader(value), []);

  return (
    <LoaderContext.Provider value={handleLoader}>
      {children}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10000 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoaderContext.Provider>
  );
}