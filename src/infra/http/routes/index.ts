import { FastifyInstance } from "fastify";
import { clientsRoutes } from "./clients";
import { generateRouteRoutes } from "./route";

export const defaultAuditTypes = {
  createdAt: { type: 'string', format: 'date-time' },
  updatedAt: { type: ['string', 'null'], format: 'date-time' },
  deleted: { type: ['boolean'], default: 'false'},
}

export const defaultItemResponseType = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    },
    name: {type: 'string'},
  email: {
      type: 'string',
      format: 'email'
  },
  phoneNumber: {
    type: 'string',
    format: '+XXXXXXXXX'
  },
  ...defaultAuditTypes

  },
}

export const generateRoutes = (fastify : FastifyInstance ) => {
  fastify.register(clientsRoutes, {prefix: '/clients'})
  fastify.register(generateRouteRoutes, {prefix: '/routes'})

}
