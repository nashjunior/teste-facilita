import { Client } from '#clients/domain';
import { ISearchableRepository } from '#seedwork/domain';

export class Usecase {
  constructor(
    private readonly usersRepository: ISearchableRepository<Client>,
  ) {}

  async execute(data: IInput): Promise<void> {
    await this.usersRepository.delete(data.uuid);
  }
}

export type IInput = { uuid: string };
