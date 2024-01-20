import { NotFoundError } from '#seedwork/domain/errors';
import { ClientsInMemoryRepository } from '#clients/infra';
import { Client } from '#clients/domain';
import { Usecase as UpdateClientUsecase } from '../update-client';

describe('Update client usecase unit tests', () => {
  let useCase: UpdateClientUsecase;
  let repo: ClientsInMemoryRepository;

  beforeEach(() => {
    repo = new ClientsInMemoryRepository();
    useCase = new UpdateClientUsecase(repo);
  });

  test('Should throw an error if id not found', async () => {
    expect(async () => {
      await useCase.execute({
        uuid: 'non-existing-id',
        name: 'new nome',
        email: 'new@email.com',
        phoneNumber: '1234567890',
      });
    }).rejects.toThrow(NotFoundError);
  });

  test('Should update client entity', async () => {
    const clientProps = {
      name: 'Nome Original',
      email: 'original@email.com',
      phoneNumber: '123456789',
    };
    const client = Client.create(clientProps);
    await repo.create(await client);

    const updatedProps = {
      name: 'Nome Atualizado',
      email: 'updated@email.com',
      phoneNumber: '987654321',
    };

    await useCase.execute({ uuid: (await client).uuid, ...updatedProps });

    const updatedClient = await repo.findById((await client).uuid);
    expect(updatedClient).toMatchObject(updatedProps);
  });
});
