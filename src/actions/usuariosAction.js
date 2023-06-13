export const LISTAR_USUARIOS = (data) => {
  let { email } = data;
  
  return `
    query ListUsers {
        usersList(filter: { email: { not_equals: "${email}" } }) {
          items {
            id
            email
          }
      }
    }
  `
}

export const BUSCAR_USUARIO = (data) => {
  let { email } = data;
  
  return `
    query ListUsers {
      usersList (filter: { email: { equals: "${email}" } }) {
        items {
          id
        }
      }
    }
  `
}

export const CREAR_USUARIO = (data) => {
  let { email } = data;
  
  return `
    mutation CreateUsers {
      userCreate(data: { email: "${email}", status: "active" }) {
        id
        email
      }
    }
  `
}

export const ASIGNAR_USUARIO = (data) => {
  let { id, email } = data;
  
  return `
    mutation {
      tareaUpdate(data: { id: "${id}", email: "${email}", estado: 1 }) {
        id
        titulo
        descripcion
        email
      }
    }
  `
}
