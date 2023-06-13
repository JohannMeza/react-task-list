import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { PRIVATE_PATH } from '../../../constants/PathConstants';
import { SaveRequestData } from '../../../helpers/helpRequestBackend';
import { BUSCAR_USUARIO, CREAR_USUARIO } from '../../../actions/usuariosAction';
import useLoaderContext from '../../../hooks/useLoaderContext';
import { MessageConstants } from '../../../constants/MessageConstants';
import { useAlert } from 'react-alert';

export default function LoginAdminPage() {
  const {isAuthenticated, user} = useAuth0();
  const setLoader = useLoaderContext();
  const navigate = useNavigate();
  const alert = useAlert();

  const crearUsuario = () => {
    setLoader(true);
    SaveRequestData({
      query: CREAR_USUARIO({email: user.email}),
      success: (resp) => {
        setLoader(false)
        navigate(PRIVATE_PATH.TAREAS_ADMIN)
      },
      error: () => {
        alert.error(MessageConstants.ERROR)
      }
    })
  }

  const isAuth = () => {
    setLoader(true);
    SaveRequestData({
      query: BUSCAR_USUARIO({email: user.email}),
      success: (resp) => {
        setLoader(false)
        if (resp.data.usersList.items.length === 0) crearUsuario()
        else navigate(PRIVATE_PATH.TAREAS_ADMIN)
      },
      error: () => {
        alert.error(MessageConstants.ERROR)
      }
    })
  }

  useEffect(() => {(isAuthenticated) && isAuth()}, [isAuthenticated])
  return <></>
}