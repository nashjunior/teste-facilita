/* eslint-disable @typescript-eslint/naming-convention */

import { Client } from '../../domain/entities';
import { ClientsRepository } from '#clients/domain/repository';
import { IClientOutput } from '../dto';

export class Usecase {
  constructor(
    private readonly clientsRepository: ClientsRepository.Repository,
  ) {}

  async execute(data: Input): Promise<IClientOutput> {
    const entity = await Client.create(data);

    await this.clientsRepository.create(entity);

    return entity.toJSON();
  }
}

export type Input = {
  nome: string;
  endereco: string;
  email: string;
  telefone: string;
};

export type IClientsOutput = {
  id: string;
  nome: string;
  endereco: string;
  email: string;
  telefone: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date | null;
};
