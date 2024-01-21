import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ClientsController } from "../contorllers";

const clientsController = new ClientsController()

export const clientsRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void
) => {
  fastify.post('/', clientsController.create)
  done()
}
