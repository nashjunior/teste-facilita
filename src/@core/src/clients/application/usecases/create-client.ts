/* eslint-disable @typescript-eslint/naming-convention */

import { Client } from '../../domain/entities';
import { ClientsRepository } from '#clients/domain/repository';
import { IClientOutput } from '../dto';
import { EmailAlreadyExistentError } from '#clients/domain/errors';

export class Usecase {
  constructor(
    private readonly clientsRepository: ClientsRepository.Repository,
  ) {}

  async execute(data: Input): Promise<IClientOutput> {
    const clientWithEmail = await this.clientsRepository.findByEmail(
      data.email,
    );
    if (clientWithEmail != null)
      throw new EmailAlreadyExistentError(data.email);

    const entity = await Client.create(data);

    await this.clientsRepository.create(entity);

    return entity.toJSON();
  }
}

export type Input = { name: string; email: string; phoneNumber: string };
