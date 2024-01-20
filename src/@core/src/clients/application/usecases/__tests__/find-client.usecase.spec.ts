import { NotFoundError } from '#seedwork/domain/errors';
import { ClientsInMemoryRepository } from '#clients/infra/repositories';
import { Client } from '#clients/domain';
import { Usecase as FindClientUsecase } from '../find-client';

describe('Find client usecase unit tests', () => {
  let useCase: FindClientUsecase;
  let repo: ClientsInMemoryRepository;

  beforeEach(() => {
    repo = new ClientsInMemoryRepository();
    useCase = new FindClientUsecase(repo);
  });

  test('Should throw an error if id not found', async () => {
    expect(async () => {
      await useCase.execute({ uuid: 'non-existing-id' });
    }).rejects.toThrow(NotFoundError);
  });

  test('Should return a valid client entity', async () => {
    // Supondo que você tenha um método 'create' no Client que cria a entidade sem salvar no repositório
    const clientProps = {
      nome: 'Nome do Cliente',
      endereco: 'Endereço do Cliente',
      email: 'email@cliente.com',
      telefone: '123456789',
    };
    const client = await Client.create(clientProps);

    await repo.create(client);

    const foundClient = await useCase.execute({ uuid: client.uuid });
    expect(foundClient).toMatchObject(clientProps);
  });
});
