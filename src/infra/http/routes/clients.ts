import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ClientsController } from "../contorllers";

const clientsController = new ClientsController()

export const clientsRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void
) => {
  fastify.get('/', clientsController.list)
  fastify.get('/:id', clientsController.find)
  fastify.post('/', clientsController.create)
  fastify.put('/:id', clientsController.update)
  fastify.delete('/:id', clientsController.delete)
  done()
}
