import { ClientsRepository } from '#clients/domain';

export class Usecase {
  constructor(private readonly usersRepository: ClientsRepository.Repository) {}

  async execute(
    data: ClientsRepository.SearchParams,
  ): Promise<ClientsRepository.SearchResult> {
    return this.usersRepository.search(data);
  }
}
