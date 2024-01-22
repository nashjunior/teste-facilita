import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ClientsController } from "../contorllers";

const clientsController = new ClientsController()

export const clientsRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void
) => {
  fastify.get('/',  clientsController.list)
  fastify.get('/:id/coordinates', clientsController.findCoordinate)
  fastify.get('/:id',  {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
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
        },
      },
    },
  }, clientsController.find)
  fastify.post('/', clientsController.create)
  fastify.put('/:id',clientsController.update)
  fastify.delete('/:id', clientsController.delete)
  done()
}
