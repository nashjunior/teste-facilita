import { EntityValidationError } from '#seedwork/domain/errors';
import { Usecase as CreateUserUsecase } from '../create-user';
import { UsersInMemoryRepository } from '#clients/infra';

describe('Create user usecase unit tests', () => {
  let useCase: CreateUserUsecase;
  let repo: UsersInMemoryRepository;

  beforeEach(() => {
    repo = new UsersInMemoryRepository();
    useCase = new CreateUserUsecase(repo);
  });

  test('Should throw an error on invalid input', async () => {
    expect(async () => {
      await useCase.execute(undefined as any);
    }).rejects.toThrow(EntityValidationError);
  });

  test('Should return a physical user', async () => {
    const props = {
      name: 'some-name',
      username: 'some-username',
      isCustomer: true,
      isPhysicalPerson: true,
    };

    let entity = await useCase.execute({ ...props, password: 'password' });

    expect(entity.id).toBeDefined();
    expect(entity).toMatchObject(props);

    props.isCustomer = false;

    entity = await useCase.execute({ ...props, password: 'password' });

    expect(entity).toMatchObject(props);
  });

  test('Should return a legal user', async () => {
    const props = {
      name: 'some-name',
      username: 'some-username',
      isCustomer: true,
      isPhysicalPerson: false,
    };

    let entity = await useCase.execute({ ...props, password: 'password' });

    expect(entity.id).toBeDefined();
    expect(entity).toMatchObject(props);

    props.isCustomer = false;

    entity = await useCase.execute({ ...props, password: 'password' });

    expect(entity).toMatchObject(props);
  });
});
