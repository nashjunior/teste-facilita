import { GenerateRouteUsecase } from "#clients/application"
import { ClientsCoordinatesRepository } from "#clients/infra/repositories"
import { FastifyReply, FastifyRequest } from "fastify"

export class RoutesController {
  async generate(_: FastifyRequest, response: FastifyReply) {
    const repository = new ClientsCoordinatesRepository()
    const createClientUsecase = new GenerateRouteUsecase.Usecase(repository)

    const client = await createClientUsecase.execute()

    return response.status(200).send(client)
  }
}
