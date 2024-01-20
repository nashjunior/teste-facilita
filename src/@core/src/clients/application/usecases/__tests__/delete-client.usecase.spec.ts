import { NotFoundError } from '#seedwork/domain/errors';
import { ClientsInMemoryRepository } from '#clients/infra';
import { Client } from '#clients/domain';
import { Usecase as DeleteClientUsecase } from '../delete-client';
import { Usecase as FindClientUsecase } from '../find-client';

describe('Delete client usecase unit tests', () => {
  let deleteClientUsecase: DeleteClientUsecase;
  let findClientUsecase: FindClientUsecase;
  let repo: ClientsInMemoryRepository;

  beforeEach(() => {
    repo = new ClientsInMemoryRepository();
    deleteClientUsecase = new DeleteClientUsecase(repo);
    findClientUsecase = new FindClientUsecase(repo);
  });

  test('Should throw an error if id not found', async () => {
    expect(async () => {
      await deleteClientUsecase.execute({ uuid: 'non-existing-id' });
    }).rejects.toThrow(NotFoundError);
  });

  test('Should delete a client', async () => {
    const clientProps = {
      nome: 'Nome do Cliente',
      endereco: 'Endereço do Cliente',
      email: 'email@cliente.com',
      telefone: '123456789',
    };
    const client = Client.create(clientProps);

    await repo.create(await client);

    await deleteClientUsecase.execute({ uuid: (await client).uuid });

    expect(async () => {
      await findClientUsecase.execute({ uuid: (await client).uuid });
    }).rejects.toThrow(NotFoundError);
  });
});
