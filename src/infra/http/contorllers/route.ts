import { GenerateRouteUsecase } from "#clients/application"
import { ClientCoordinatesRepository } from "#clients/infra"
import { FastifyReply, FastifyRequest } from "fastify"

export class RoutesController {
  async generate(_: FastifyRequest, response: FastifyReply) {
    const repository = new ClientCoordinatesRepository()
    const createClientUsecase = new GenerateRouteUsecase.Usecase(repository)

    const client = await createClientUsecase.execute()

    return response.status(200).send(client)
  }
}
