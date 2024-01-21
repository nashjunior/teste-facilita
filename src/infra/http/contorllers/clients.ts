import { FastifyReply, FastifyRequest } from "fastify";
import { ClientRepository } from "#clients/infra/repositories/postgresql";
import { CreateClientUsecase, DeleteClientUsecase, FindClientUsecase, ListClientsUsecase, UpdateClientUsecase } from "#clients/application";
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

    const repository = new ClientRepository()

    const listCLientsUsecase = new ListClientsUsecase.Usecase(repository)

    const listClients = await listCLientsUsecase.execute(searchParams)

    return response.status(200).send(listClients)
  }

  async find(request: FastifyRequest<{Params: {id: string}}>, response: FastifyReply) {
    const repository = new ClientRepository()
    const createClientUsecase = new FindClientUsecase.Usecase(repository)

    const client = await createClientUsecase.execute({uuid: request.params.id})

    return response.status(201).send(client)
  }

  async create(request: FastifyRequest<{Body: CreateClientUsecase.Input}>, response: FastifyReply) {
    const repository = new ClientRepository()
    const createClientUsecase = new CreateClientUsecase.Usecase(repository)

    const client = await createClientUsecase.execute(request.body)

    return response.status(201).send(client)
  }

  async update(request: FastifyRequest<{Params:{id: string},Body: CreateClientUsecase.Input}>, response: FastifyReply) {
    const repository = new ClientRepository()
    const createClientUsecase = new UpdateClientUsecase.Usecase(repository)

    const client = await createClientUsecase.execute({
      uuid: request.params.id,
      ...request.body
    })

    return response.status(200).send(client)
  }

  async delete(request: FastifyRequest<{Params: {id: string}}>, response: FastifyReply) {
    const repository = new ClientRepository()
    const createClientUsecase = new DeleteClientUsecase.Usecase(repository)

    await createClientUsecase.execute({uuid: request.params.id})

    return response.status(204).send()
  }
}
