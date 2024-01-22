import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { RoutesController } from "../contorllers/route";
import { defaultItemResponseType } from ".";

const routesController = new RoutesController()

export const generateRouteRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void
) => {
  fastify.get('/generate',
  {
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            ...defaultItemResponseType
          }
        }
      }}
    }
    ,routesController.generate)
  done()
}
