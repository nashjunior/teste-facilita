import { GenerateRouteUsecase } from "#clients/application"
import { ClientsCoordinatesPostgresRepository } from "#clients/infra/repositories/postgresql"
import { FastifyReply, FastifyRequest } from "fastify"

export class RoutesController {
  async generate(_: FastifyRequest, response: FastifyReply) {
    const repository = new ClientsCoordinatesPostgresRepository()
    const createClientUsecase = new GenerateRouteUsecase.Usecase(repository)

    const client = await createClientUsecase.execute()

    return response.status(200).send(client)
  }
}
