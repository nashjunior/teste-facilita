import { ClientsRepository } from '#clients/domain';
import { EmailAlreadyExistentError } from '#clients/domain/errors';
import { IClientOutput } from '../dto';

export class Usecase {
  constructor(private readonly usersRepository: ClientsRepository.Repository) {}

  async execute({ uuid, ...data }: IInput): Promise<IClientOutput> {
    const clientWithEmail = await this.usersRepository.findByEmail(data.email);

    if (clientWithEmail && clientWithEmail.uuid !== uuid)
      throw new EmailAlreadyExistentError(data.email);

    const entity = await this.usersRepository.findById(uuid);

    await entity.update(data);

    await this.usersRepository.update(entity);

    return entity.toJSON();
  }
}

export type IInput = {
  uuid: string;
  name: string;
  email: string;
  phoneNumber: string;
};
