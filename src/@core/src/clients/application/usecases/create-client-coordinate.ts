/* eslint-disable @typescript-eslint/naming-convention */

import { ClientCoordinate } from '../../domain/entities';
import {
  ClientsCoordinatesRepository,
  ClientsRepository,
} from '#clients/domain/repository';

export class Usecase {
  constructor(
    private readonly clientsRepository: ClientsRepository.Repository,
    private readonly clientsCoordinatesRepository: ClientsCoordinatesRepository.Repository,
  ) {}

  async execute(data: Input): Promise<IClientsCoordinatesOutput> {
    const client = await this.clientsRepository.findById(data.clientId);

    const entity = await ClientCoordinate.create(client, {
      latitude: data.latitude,
      longitude: data.longitude,
    });

    await this.clientsCoordinatesRepository.create(entity);

    return entity.toJSON();
  }
}

export type Input = {
  clientId: string;
  latitude: string;
  longitude: string;
};

export type IClientsCoordinatesOutput = {
  id: string;
  latitude: string;
  longitude: string;
};
