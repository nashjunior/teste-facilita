import { FastifyReply, FastifyRequest } from "fastify";
import { ClientsInMemoryRepository } from "#clients/infra/repositories/inMemory/clients-repository";

export class ClientsController {
  async create(request: FastifyRequest, response: FastifyReply) {
    const repository = new ClientsInMemoryRepository()
    console.log(repository);

  }
}
