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
        nome: 'new nome',
        endereco: 'new endereco',
        email: 'new@email.com',
        telefone: '1234567890',
      });
    }).rejects.toThrow(NotFoundError);
  });

  test('Should update client entity', async () => {
    const clientProps = {
      nome: 'Nome Original',
      endereco: 'Endereço Original',
      email: 'original@email.com',
      telefone: '123456789',
      deleted: false,
    };
    const client = Client.create(clientProps);
    await repo.create(await client);

    const updatedProps = {
      nome: 'Nome Atualizado',
      endereco: 'Endereço Atualizado',
      email: 'updated@email.com',
      telefone: '987654321',
      deleted: false,
    };

    await useCase.execute({ uuid: (await client).uuid, ...updatedProps });

    const updatedClient = await repo.findById((await client).uuid);
    expect(updatedClient).toMatchObject(updatedProps);
  });
});
