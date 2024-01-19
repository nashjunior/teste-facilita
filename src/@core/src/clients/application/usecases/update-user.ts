import { User } from '#clients/domain';
import { ISearchableRepository } from '#seedwork/domain';
import { IUsersOutput } from '../dto';

export class Usecase {
  constructor(private readonly usersRepository: ISearchableRepository<User>) {}

  async execute({ id, ...data }: IInput): Promise<IUsersOutput> {
    const entity = await this.usersRepository.findById(id);

    entity.update(data);

    await this.usersRepository.update(entity);

    return entity.toJSON();
  }
}

export type IInput = {
  id: string;
  name: string;
  username: string;
  password: string;
  isCustomer: boolean;
  isPhysicalPerson: boolean;
};
