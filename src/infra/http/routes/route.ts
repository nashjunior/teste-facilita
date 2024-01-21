import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { RoutesController } from "../contorllers/route";

const routesController = new RoutesController()

export const generateRouteRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void
) => {
  fastify.get('/generate', routesController.generate)
  done()
}
