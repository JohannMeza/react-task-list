import React, { useEffect, useState } from 'react';
import TareasStyles from '../../../../styles/Tareas.module.css'
import useLoaderContext from '../../../../hooks/useLoaderContext';
import { Box, Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import { ICON } from '../../../../components/icons/Icon';
import { Controls } from '../../../../components/Controls';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
import { useAuth0 } from '@auth0/auth0-react';
import { LISTAR_TAREAS, CREAR_TAREA, ACTUALIZAR_TAREA, ELIMINAR_TAREA, FUNCTION_ACTUALIZAR_ESTADO_TAREA } from '../../../../actions/tareasAction';
import { useAlert } from 'react-alert';
import { MessageConstants } from '../../../../constants/MessageConstants';
import { ASIGNAR_USUARIO, LISTAR_USUARIOS } from '../../../../actions/usuariosAction';
import { validarCampos } from '../../../../utils/validarCampos';

const dataInitialTarea = { titulo: '', descripcion: '', estado: 1, email_asig: '' }

export default function TareasAdminPage() {
  const {user} = useAuth0();
  const [openTarea, setOpenTarea] = useState(false);
  const [openAsign, setOpenAsign] = useState(false);
  const {data, setData, handleInputFormChange, resetForm} = useFormValidation(dataInitialTarea);
  const [tareas, setTareas] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const setLoader = useLoaderContext();
  const alert = useAlert();

  const openModalAsign = ({...payload}) => {
    setOpenAsign(true)
    setData({...payload})
  }

  const actionTarea = (payload = {}) => {
    setOpenTarea(true)
    setData({...payload})
  }

  const listarTareas = () => {
    setLoader(true)
    SaveRequestData({
      query: LISTAR_TAREAS({email: user?.email}),
      success: (resp) => {
        setLoader(false)
        setTareas(resp.data.tareasList.items)
      },
      error: (err) => {
        alert.error(MessageConstants.ERROR)
      }
    })
  }

  const listarUsuarios = () => {
    setLoader(true)
    SaveRequestData({
      query: LISTAR_USUARIOS({email: user.email}),
      success: (resp) => {
        setLoader(false)
        let arrUsuarios = resp.data.usersList.items.map(el => ({label: el.email, value: el.id}))
        setUsuarios(arrUsuarios)
      },
      error: (err) => {
        alert.error(MessageConstants.ERROR)
      }
    })
  }

  const actualizarEstado = (id, estado) => {
    setLoader(true)
    SaveRequestData({
      query: FUNCTION_ACTUALIZAR_ESTADO_TAREA({id, estado}),
      success: (resp) => {
        listarTareas()
        setLoader(false)
        setOpenTarea(false)
        alert.success(resp.data.updateStateTask.result)
      },
      error: () => {
        alert.error(MessageConstants.ERROR)
      }
    })
  }

  const eliminarEstado = (id) => {
    setLoader(true)
    SaveRequestData({
      query: ELIMINAR_TAREA({id}),
      success: (resp) => {
        listarTareas()
        setLoader(false)
        setOpenTarea(false)
        alert.success(MessageConstants.SUCCESS)
      },
      error: () => {
        alert.error(MessageConstants.ERROR)
      }
    })
  }

  const guardarTarea = () => {
    let {message, error} = validarCampos({
      titulo: { value: data.titulo, require: true},
      descripcion: { value: data.descripcion , require: true}
    })
    if (error) return alert.info(message)
    
    setLoader(true)
    SaveRequestData({
      query: data.id ? ACTUALIZAR_TAREA({...data, email: user.email}) : CREAR_TAREA({...data, email: user.email, estado: 1}),
      success: (resp) => {
        setLoader(false)
        setOpenTarea(false)
        resetForm()
        listarTareas()
        alert.success(MessageConstants.SUCCESS)
      },
      error: () => {
        alert.error(MessageConstants.ERROR)
      }
    })
  }

  const asignarTarea = (id, idUser) => {
    const email = usuarios.find(el => el.value === idUser).label
    setLoader(true)
    SaveRequestData({
      query: ASIGNAR_USUARIO({id, email}),
      success: (resp) => {
        listarTareas()
        setLoader(false)
        setOpenAsign(false)
        alert.success(MessageConstants.SUCCESS)
      },
      error: (err) => {
        alert.error(MessageConstants.ERROR)
      }
    })
  }

  const closeModalTarea = () => {
    setOpenTarea(false)
    resetForm()
  }

  const closeModalAsig = () => {
    setOpenAsign(false)
    resetForm()
  }

  useEffect(() => {
    if (user) {
      listarTareas()
      listarUsuarios()
    }
  }, [])

  return (
    <Stack display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="100%" height="100%">
      <Stack display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="60%">
        <h2>Mi Lista de Tareas</h2>
        <Button startIcon={ICON.ADD} variant="contained" onClick={() => actionTarea()}>Nuevo</Button>
      </Stack>
      <Box className={TareasStyles.tareasContainer}>
        {tareas && tareas.map((el, index) => <ItemComponent key={index} tarea={el} actionTarea={actionTarea} openModalAsign={openModalAsign} tareaCompletada={actualizarEstado}/>) }
      </Box>
      
      <Controls.Modal
        open={openTarea}
        setOpen={closeModalTarea}
        minWidth={600}
        fullWidth={true}
        maxWidth="sm"
        title={data.id ? "Editar Tarea" : "Nueva Tarea"}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <Controls.InputComponent 
              label="Nombre de la tarea"
              name="titulo"
              onChange={handleInputFormChange}
              value={data.titulo}
              />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Controls.InputComponent 
              label="Descripcion de la tarea"
              name="descripcion"
              onChange={handleInputFormChange}
              value={data.descripcion}
            />
          </Grid>
        </Grid>
        <br />
        <Stack direction="row" spacing={3} justifyContent="center">
          {data.estado === 0 ? (
            <Button
              variant="outlined"
              icon={ICON.BACK}
              onClick={() => eliminarEstado(data.id)}
            >
              ELIMINAR
          </Button>
          ) : (
            <>
              {
                data.id &&
                <Button
                  variant="outlined"
                  icon={ICON.BACK}
                  onClick={() => actualizarEstado(data.id, 0)}
                >
                  Anular
                </Button>
              }
              <Button
                variant="contained"
                icon={ICON.SAVE}
                onClick={() => guardarTarea(data.id)}
              >
                {data.id ? "Actualizar" : "Guardar"}
              </Button>
            </>
          )}
        </Stack>
      </Controls.Modal>

      <Controls.Modal
        open={openAsign}
        setOpen={() => setOpenAsign(false)}
        minWidth={600}
        fullWidth={true}
        maxWidth="sm"
        title="Asignar Tarea"
      >
        <Stack display="flex" gap={1}>
          <Typography variant="body1" component="p" sx={{ textAlign: "center" }}>Tarea a Asignar</Typography>
          <Typography variant="h6" component="p" sx={{ textAlign: "center", border: "0.5px solid #ccc" }}>{data.titulo}</Typography>
        </Stack>
        <br />
        <Stack display="flex" gap={1}>
          <Typography variant="body1" component="p" sx={{ textAlign: "center" }}>Usuario a Asignar</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <Controls.SearchComponent 
                label="Usuario"
                name="email_asig"
                onChange={handleInputFormChange}
                value={data.email_asig}
                list={usuarios}
              />
            </Grid>
          </Grid>
        </Stack>
        <br />
        <Stack direction="row" spacing={3} justifyContent="center">
          <Button variant="outlined" icon={ICON.BACK} onClick={closeModalAsig}>Cancelar</Button>
          <Button variant="contained" icon={ICON.SAVE} onClick={() => asignarTarea(data.id, data.email_asig)}>Asignar</Button>
        </Stack>
      </Controls.Modal>
    </Stack>
  )
}

const ItemComponent = ({tarea, actionTarea, openModalAsign, tareaCompletada}) => {
  const listOpciones = [
    {option: 'Editar', callback: () => actionTarea(tarea)},
    {option: 'Asignar Tarea', callback: () => openModalAsign(tarea)},
    {option: 'Completado', callback: () => tareaCompletada(tarea.id, 2)},
  ]

  const retornarIcono = () => {
    if (tarea.estado === 2) return (ICON.CHECK)
    else if (tarea.estado === 1) return (ICON.INFO)
    else return (ICON.CLOSE_CIRCLE)
  }

  return (
    <div className={TareasStyles.tareasContainerItem} data-estado={`tarea-${tarea.estado}`}>
      <Box paddingY={.5}>{retornarIcono()}</Box>
      <Box width="100%">
        <Stack display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="h6" component="span">{tarea.titulo}</Typography>
          <Controls.Popover list={[0,2].includes(tarea.estado) ? listOpciones.splice(0,2) : listOpciones} style={{ marginLeft: "5px" }} className={TareasStyles.tareasButtonOpcion}>
            <IconButton size="small">{ICON.MENU}</IconButton>
          </Controls.Popover>      
        </Stack>
        <Typography variant="body2" component="p">{tarea.descripcion}</Typography>
      </Box>
    </div>
  )
}