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
      name: 'Nome do Cliente',
      email: 'email@cliente.com',
      phoneNumber: '123456789123123',
    };
    const client = await Client.create(clientProps);

    await repo.create(client);

    await deleteClientUsecase.execute({ uuid: client.uuid });

    expect(async () => {
      await findClientUsecase.execute({ uuid: client.uuid });
    }).rejects.toThrow(NotFoundError);
  });
});
