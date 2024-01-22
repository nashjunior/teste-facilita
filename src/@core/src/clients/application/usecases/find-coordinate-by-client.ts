import { ClientsCoordinatesRepository } from '#clients/domain';
import { NotFoundError } from '#seedwork/domain';
import { IClientCoordinateOutput } from '../dto';

export class Usecase {
  constructor(
    private readonly clientCoordinatesRepository: ClientsCoordinatesRepository.Repository,
  ) {}

  async execute(data: IInput): Promise<IClientCoordinateOutput> {
    const entity = await this.clientCoordinatesRepository.findByIdClient(
      data.uuid,
    );

    if (!entity)
      throw new NotFoundError(`Could not find a entity using id $${data.uuid}`);

    return entity.toJSON();
  }
}

export type IInput = { uuid: string };
