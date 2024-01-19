import { User } from '#clients/domain';
import { ISearchableRepository } from '#seedwork/domain';

export class Usecase {
  constructor(private readonly usersRepository: ISearchableRepository<User>) {}

  async execute(data: IInput): Promise<void> {
    await this.usersRepository.delete(data.id);
  }
}

export type IInput = { id: string };
