import {
  ClientCoordinate,
  ClientsCoordinatesRepository,
  ClientsRepository,
} from '#clients/domain';

import { IClientOutput } from '../dto';

export class Usecase {
  constructor(
    private readonly clientCoordinateRepository: ClientsCoordinatesRepository.Repository,
    private readonly clientRepository: ClientsRepository.Repository,
  ) {}

  async execute({ id, ...data }: IInput): Promise<IClientOutput> {
    const clientEntity = await this.clientRepository.findById(id);
    const coordinateEntity =
      await this.clientCoordinateRepository.findByIdClient(id);

    if (coordinateEntity) {
      await coordinateEntity.update(data);
      await this.clientCoordinateRepository.update(coordinateEntity);
    } else {
      const coordinateNew = await ClientCoordinate.create(clientEntity, {
        latitude: data.latitude,
        longitude: data.longitude,
      });
      await this.clientCoordinateRepository.create(coordinateNew);
    }

    return clientEntity.toJSON();
  }
}

export type IInput = {
  id: string;
  latitude: string;
  longitude: string;
};

export type IClientsCoordinatesOutput = {
  id: string;
  clientId: string;
  latitude: string;
  longitude: string;
};
