import { FastifyInstance } from "fastify";
import { clientsRoutes } from "./clients";
import { generateRouteRoutes } from "./route";

export const generateRoutes = (fastify : FastifyInstance ) => {
  fastify.register(clientsRoutes, {prefix: '/clients'})
  fastify.register(generateRouteRoutes, {prefix: '/routes'})

}
