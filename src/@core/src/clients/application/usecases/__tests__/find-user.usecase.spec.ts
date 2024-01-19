import { NotFoundError } from '#seedwork/domain/errors';
import { UsersInMemoryRepository } from '#clients/infra';
import { User } from '#clients/domain';
import { Usecase as FindUserUsecase } from '../find-user';

describe('Find user usecase unit tests', () => {
  let useCase: FindUserUsecase;
  let repo: UsersInMemoryRepository;

  beforeEach(() => {
    repo = new UsersInMemoryRepository();
    useCase = new FindUserUsecase(repo);
  });

  test('Should throw an error on id', async () => {
    const entity = await User.create({
      name: 'some-name',
      username: 'some-username',
      password: 'some-password',
      isCustomer: true,
      isPhysicalPerson: true,
    });

    await repo.create(entity);

    expect(async () => {
      await useCase.execute({ id: 'auehaueh' });
    }).rejects.toThrow(NotFoundError);
  });

  test('Should return a valid entity', async () => {
    const entity = await User.create({
      name: 'some-name1',
      username: 'some-username',
      password: 'some-password',
      isCustomer: true,
      isPhysicalPerson: true,
    });

    await repo.create(entity);

    expect(await useCase.execute({ id: entity.uuid })).toMatchObject(
      entity.toJSON(),
    );
  });
});
