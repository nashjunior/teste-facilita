import { FastifyReply, FastifyRequest } from "fastify";
import { CreateClientCordinatesUsecase,DeleteClientCoordinatesUsecase, UpdateClientCoordinatesUsecase } from "#clients/application/usecases";
import { ClientsCoordinatesPostgresRepository, ClientsPostgresRepository } from "#clients/infra/repositories";

export class ClientsCoordinatesController {
  async create(request: FastifyRequest<{Body: CreateClientCordinatesUsecase.Input}>, response: FastifyReply) {
    const {clientId,latitude,longitude} = request.body

    const repositoryClient = new ClientsPostgresRepository();
    const repositoryClientCoordinate = new ClientsCoordinatesPostgresRepository()

    const useCase = new CreateClientCordinatesUsecase.Usecase(repositoryClient,repositoryClientCoordinate)
    const clientCoordinate = await useCase.execute({
      clientId,
      latitude,
      longitude
    })
    return response.status(201).send(clientCoordinate)
  }
  async update(request: FastifyRequest<{ Params: { id: string }, Body: UpdateClientCoordinatesUsecase.IInput }>, response: FastifyReply) {
    const { latitude,longitude } = request.body;

    const repository = new ClientsCoordinatesPostgresRepository();

    const useCase = new UpdateClientCoordinatesUsecase.Usecase(repository);

    const updatedClient = await useCase.execute({
      id,
      latitude,
      longitude
    });

    return response.status(201).send(updatedClient);
}


  async delete(request: FastifyRequest<{ Params: { id: string } }>, response: FastifyReply) {
    const { id } = request.params;

    const repository = new ClientsCoordinatesPostgresRepository();
    const useCase = new DeleteClientCoordinatesUsecase.Usecase(repository);

    await useCase.execute({ uuid: id });
    return response.status(204).send();
}

}
