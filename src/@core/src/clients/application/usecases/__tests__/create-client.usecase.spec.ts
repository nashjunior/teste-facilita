import { EntityValidationError } from '#seedwork/domain/errors';
import { Usecase as CreateClientUsecase } from '../create-client';
import { ClientsInMemoryRepository } from '#clients/infra';

describe('Create client usecase unit tests', () => {
  let useCase: CreateClientUsecase;
  let repo: ClientsInMemoryRepository;

  beforeEach(() => {
    repo = new ClientsInMemoryRepository();
    useCase = new CreateClientUsecase(repo);
  });

  test('Should throw an error on invalid input', async () => {
    expect(async () => {
      await useCase.execute(undefined as any);
    }).rejects.toThrow(EntityValidationError);
  });

  test('Should create and return a client', async () => {
    const props = {
      name: 'Nome do Cliente',
      email: 'email@cliente.com',
      phoneNumber: '123456789',
    };

    const client = await useCase.execute({ ...props });

    expect(client.id).toBeDefined();
    expect(client).toMatchObject(props);
  });
});
