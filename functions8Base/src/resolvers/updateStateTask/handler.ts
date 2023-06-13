/**
 * This file was generated using 8base CLI.
 *
 * To learn more about writing custom GraphQL resolver functions, visit
 * the 8base documentation at:
 *
 * https://docs.8base.com/docs/8base-console/custom-functions/resolvers/
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    updateStateTask:
 *      ...
 *
 * Data that is sent to this function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * There are two ways to invoke this function locally:
 *
 *  (1) Explicit file mock file path using '-p' flag:
 *    8base invoke-local updateStateTask -p src/resolvers/updateStateTask/mocks/request.json
 *
 *  (2) Default mock file location using -m flag:
 *    8base invoke-local updateStateTask -m request
 *
 *  Add new mocks to this function to test different input arguments. Mocks can easily be generated
 *  the following generator command:
 *    8base generate mock updateStateTask -m [MOCK_FILE_NAME]
 */

import { FunctionContext, FunctionEvent, FunctionResult } from '8base-cli-types';
import ggl from 'graphql-tag';

const query = ggl`
mutation Listing($id: ID!, $estado: Int!) {
  tareaUpdate(data: { id: $id, estado: $estado }) {
    id
    estado
  }
}`;

type ResolverResult = FunctionResult<{
  result: string,
}>;

export default async (
  event: FunctionEvent<{ id: String, estado: Number, foo: string }>,
  ctx: FunctionContext,
): ResolverResult => {

  const variables = { id: event.data.id, estado: event.data.estado };
  const result = await ctx.api.gqlRequest(query, variables);
  
  return {
    data: {
      result: "Peticion exitosa"
    },
  };
};
