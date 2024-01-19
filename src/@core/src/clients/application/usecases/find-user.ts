import { User } from '#clients/domain';
import { IReadbleRepository } from '#seedwork/domain';
import { IUsersOutput } from '../dto';

export class Usecase {
  constructor(private readonly usersRepository: IReadbleRepository<User>) {}

  async execute(data: IInput): Promise<IUsersOutput> {
    const entity = await this.usersRepository.findById(data.id);

    return entity.toJSON();
  }
}

export type IInput = {
  id: string;
};
