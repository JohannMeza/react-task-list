const actualizarEstado = async (_: any, args: { id: string, estado: number }, context: any) => {
  try {
    const { id, estado } = args;
    const query = `
      query GetUserByEmail($email: String!) {
        userByEmail(email: $email) {
          id
          name
          email
        }
      }
    `;
    const variables = { id, estado };
    const result = await context.api.gqlRequest(query, variables);

    return result;
  } catch (error) {
    throw new Error('Hubo un error al ejecutar exampleResolver');
  }
};

export default actualizarEstado;