import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ClientsCoordinatesController } from "../contorllers";

const clientsCoordinatesController = new ClientsCoordinatesController()

export const clientsCoordinatesRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void
) => {
  fastify.post('/', clientsCoordinatesController.create)  
  fastify.put('/', clientsCoordinatesController.update)  
  fastify.delete('/:id', clientsCoordinatesController.delete)  
  done()
}
