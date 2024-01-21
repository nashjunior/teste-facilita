import { FastifyInstance } from "fastify";
import { clientsRoutes } from "./clients";
import { clientsCoordinatesRoutes } from "./clients-coordinates";

export const generateRoutes = (fastify : FastifyInstance ) => {
  fastify.register(clientsRoutes, {prefix: '/clients'})
  fastify.register(clientsCoordinatesRoutes, {prefix: '/clients-coordinates'})

}
