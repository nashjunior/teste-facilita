import { FastifyInstance } from "fastify";
import { clientsRoutes } from "./clients";

export const generateRoutes = (fastify : FastifyInstance ) => {
  fastify.register(clientsRoutes, {prefix: '/clients'})

}
