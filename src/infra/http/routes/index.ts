import { FastifyInstance } from "fastify";
import { clientsRoutes } from "./clients";
import { clientsCoordinatesRoutes } from "./clients-coordinates";
import { generateRouteRoutes } from "./route";

export const generateRoutes = (fastify : FastifyInstance ) => {
  fastify.register(clientsRoutes, {prefix: '/clients'})
  fastify.register(clientsCoordinatesRoutes, {prefix: '/clients-coordinates'})
  fastify.register(generateRouteRoutes, {prefix: '/routes'})

}
