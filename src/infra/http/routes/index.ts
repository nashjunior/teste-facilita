import { FastifyInstance } from "fastify";
import { clientsRoutes } from "./clients";
import { generateRouteRoutes } from "./route";

export const defaultItemResponseType = {
  properties: {
    // Define the properties expected in the response
    id: {
      type: 'string',
      format: 'uuid'
    },
  email: {
      type: 'string',
      format: 'email'
  },
  phoneNumber: {
    type: 'string',
    format: '+XXXXXXXXX'
  },
  createdAt: { type: 'string', format: 'date-time' },
  updatedAt: { type: ['string', 'null'], format: 'date-time' },
  deleted: { type: ['boolean'], default: 'false'},
  },
}

export const generateRoutes = (fastify : FastifyInstance ) => {
  fastify.register(clientsRoutes, {prefix: '/clients'})
  fastify.register(generateRouteRoutes, {prefix: '/routes'})

}
