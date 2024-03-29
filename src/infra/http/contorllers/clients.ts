import { FastifyReply, FastifyRequest } from "fastify";
import { ClientsPostgresRepository,ClientsCoordinatesPostgresRepository } from "#clients/infra/repositories/postgresql";
import { CreateClientUsecase,UpdateClientCoordinateUsecase, DeleteClientUsecase, FindClientUsecase, ListClientsUsecase, UpdateClientUsecase, FindCoordinateByClientUsecase } from "#clients/application";
import { ClientsRepository } from "#clients/domain";

export type IParamsListClients = {
  query?: string;
  'query_fields[]'?: string | string[];
  query_fields?: string | string[];
  page?: number;
  per_page: number;
};

export class ClientsController {

  async list({query: { query, page, per_page, ...rest },}: FastifyRequest<{Querystring: IParamsListClients}>, response: FastifyReply) {
    let queryFields: string[] = []

    if (rest.query_fields != null) {
      if (Array.isArray(rest.query_fields))
        queryFields.push(...rest.query_fields);
      else queryFields.push(...rest.query_fields.split(','));
    }

    if (rest['query_fields[]']) {
      if (Array.isArray(rest['query_fields[]']))
        queryFields.push(...rest['query_fields[]']);
      else queryFields.push(rest['query_fields[]']);
    }

    const searchParams = new ClientsRepository.SearchParams({
      filter: {fields: queryFields,query: query as string },
      page,
      perPage: per_page,
    })

    const repository = new ClientsPostgresRepository()

    const listCLientsUsecase = new ListClientsUsecase.Usecase(repository)

    const listClients = await listCLientsUsecase.execute(searchParams)

    return response.status(200).send(listClients)
  }

  async find(request: FastifyRequest<{Params: {id: string}}>, response: FastifyReply) {
    const repository = new ClientsPostgresRepository()
    const createClientUsecase = new FindClientUsecase.Usecase(repository)

    const client = await createClientUsecase.execute({uuid: request.params.id})

    return response.status(200).send(client)
  }

  async findCoordinate(request: FastifyRequest<{Params: {id: string}}>, response: FastifyReply) {
    const clientsCoordinatesPostgresRepository = new ClientsCoordinatesPostgresRepository()

    const useCase = new FindCoordinateByClientUsecase.Usecase(
      clientsCoordinatesPostgresRepository
    );

    const clientCoordinate = await useCase.execute({uuid: request.params.id })
    return response.status(200).send(clientCoordinate)
  }

  async create(request: FastifyRequest<{Body: CreateClientUsecase.Input}>, response: FastifyReply) {
    const repository = new ClientsPostgresRepository()
    const createClientUsecase = new CreateClientUsecase.Usecase(repository)

    const client = await createClientUsecase.execute(request.body)

    return response.status(201).send(client)
  }

  async update(request: FastifyRequest<{Params:{id: string},Body: CreateClientUsecase.Input & UpdateClientCoordinateUsecase.IInput}>, response: FastifyReply) {
    const repository = new ClientsPostgresRepository()
    const createClientUsecase = new UpdateClientUsecase.Usecase(repository)

    const repositoryCoordinate = new ClientsCoordinatesPostgresRepository();

    const updateClientReposiory = new UpdateClientCoordinateUsecase.Usecase(repositoryCoordinate,repository);


    const client = await createClientUsecase.execute({
      uuid: request.params.id,
      ...request.body
    })

    await updateClientReposiory.execute({      id: request.params.id,
      latitude: request.body.latitude,
      longitude: request.body.longitude
    })

    return response.status(200).send(client)
  }

  async delete(request: FastifyRequest<{Params: {id: string}}>, response: FastifyReply) {
    const repository = new ClientsPostgresRepository()
    const createClientUsecase = new DeleteClientUsecase.Usecase(repository)

    await createClientUsecase.execute({uuid: request.params.id})

    return response.status(204).send()
  }
}
