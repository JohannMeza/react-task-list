export const CREAR_TAREA = (data) => {
  let { titulo, descripcion, email, estado } = data;
  
  return `
    mutation CreateTareas {
      tareaCreate(data: { titulo: "${titulo}", descripcion: "${descripcion}", email: "${email}", estado: ${estado} }) {
        id
        titulo
        descripcion
        email
      }
    }
  `
}

export const ACTUALIZAR_TAREA = (data) => {
  let { id, descripcion, email, titulo } = data;

  return `
    mutation {
      tareaUpdate(data: { id: "${id}", descripcion: "${descripcion}", email: "${email}", titulo: "${titulo}" }) {
        id
        titulo
        descripcion
        email
      }
    }
  `;
}

export const ELIMINAR_TAREA = (data) => {
  let { id } = data;

  return `
    mutation {
      tareaDelete(filter: { id: "${id}" }) {
        success
      }
    }
  `;
}

export const ACTUALIZAR_ESTADO_TAREA = (data) => {
  let { id, estado } = data;

  return `
    mutation {
      tareaUpdate(data: { id: "${id}", estado: ${estado} }) {
        id
        estado
      }
    }
  `;
}

export const FUNCTION_ACTUALIZAR_ESTADO_TAREA = (data) => {
  let { id, estado } = data;

  return `
    query {
      updateStateTask(foo: "", id: "${id}", estado: ${estado}) {
        result
      }
    }
  `;
}

export const LISTAR_TAREAS = (data) => {
  let { email } = data;
  
  return `
    query {
      tareasList (filter: { email: { equals: "${email}" } }) {
        items {
          id
          titulo
          descripcion
          email
          estado
        }
      }
    }
  `
}