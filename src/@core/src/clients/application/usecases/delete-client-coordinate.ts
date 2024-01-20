import { ClientCoordinate } from '#clients/domain';
import { ISearchableRepository } from '#seedwork/domain';

export class Usecase {
  constructor(
    private readonly clientCoordinatesRepository: ISearchableRepository<ClientCoordinate>,
  ) {}

  async execute(data: IInput): Promise<void> {
    await this.clientCoordinatesRepository.delete(data.uuid);
  }
}

export type IInput = { uuid: string };
