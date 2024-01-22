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
      //@ts-expect-error type not existsnt for key tags
      tags:['Route'],
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
