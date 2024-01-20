import { ClientCoordinate } from '#clients/domain';
import { ISearchableRepository } from '#seedwork/domain';
export class Usecase {
  constructor(
    private readonly clientCoordinateRepository: ISearchableRepository<ClientCoordinate>,
  ) {}

  async execute({ id, ...data }: IInput): Promise<IClientsCoordinatesOutput> {
    const entity = await this.clientCoordinateRepository.findById(id);

    entity.update(data);

    await this.clientCoordinateRepository.update(entity);

    return entity.toJSON();
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
