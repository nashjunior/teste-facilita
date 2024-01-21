import { ClientsRepository } from '#clients/domain';

export class Usecase {
  constructor(private readonly usersRepository: ClientsRepository.Repository) {}

  async execute(data: IInput): Promise<void> {
    await this.usersRepository.delete(data.uuid);
  }
}

export type IInput = { uuid: string };
