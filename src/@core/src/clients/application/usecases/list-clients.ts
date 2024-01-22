import { ClientsRepository } from '#clients/domain';

export class Usecase {
  constructor(private readonly usersRepository: ClientsRepository.Repository) {}

  async execute(data: ClientsRepository.SearchParams): Promise<unknown> {
    return (await this.usersRepository.search(data)).toJSON();
  }
}
