import { Client } from '#clients/domain';
import { IReadbleRepository } from '#seedwork/domain';
import { IClientOutput } from '../dto';

export class Usecase {
  constructor(private readonly usersRepository: IReadbleRepository<Client>) {}

  async execute(data: IInput): Promise<IClientOutput> {
    const entity = await this.usersRepository.findById(data.uuid);

    return entity.toJSON();
  }
}

export type IInput = {
  uuid: string;
};
