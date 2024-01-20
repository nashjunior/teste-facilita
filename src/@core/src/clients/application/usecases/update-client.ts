import { Client } from '#clients/domain';
import { ISearchableRepository } from '#seedwork/domain';
import { IClientOutput } from '../dto';

export class Usecase {
  constructor(
    private readonly usersRepository: ISearchableRepository<Client>,
  ) {}

  async execute({ uuid, ...data }: IInput): Promise<IClientOutput> {
    const entity = await this.usersRepository.findById(uuid);

    entity.update(data);

    await this.usersRepository.update(entity);

    return entity.toJSON();
  }
}

export type IInput = {
  uuid: string;
  nome: string;
  endereco: string;
  email: string;
  telefone: string;
};
