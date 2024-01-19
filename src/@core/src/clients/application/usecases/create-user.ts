/* eslint-disable @typescript-eslint/naming-convention */

import { User } from '../../domain/entities';
import { UsersRepository } from '#clients/domain/repository';
import { IUsersOutput } from '../dto';

export class Usecase {
  constructor(private readonly usersRepository: UsersRepository.Repository) {}

  async execute(data: Input): Promise<IUsersOutput> {
    const entity = await User.create(data);

    await this.usersRepository.create(entity);

    return entity.toJSON();
  }
}

export type Input = {
  name: string;
  username: string;
  password: string;
  isCustomer: boolean;
  isPhysicalPerson: boolean;
};
