import { NotFoundError } from '#seedwork/domain/errors';
import { UsersInMemoryRepository } from '#clients/infra';
import { User } from '#clients/domain';
import { Usecase as DeleteUserUsecase } from '../delete-user';
import { Usecase as FindUserUsecase } from '../find-user';

describe('Delete user usecase unit tests', () => {
  let useCase: DeleteUserUsecase;
  let repo: UsersInMemoryRepository;

  beforeEach(() => {
    repo = new UsersInMemoryRepository();
    useCase = new DeleteUserUsecase(repo);
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

  test('Should delete a entity', async () => {
    const entity = await User.create({
      name: 'some-name1',
      username: 'some-username',
      password: 'some-password',
      isCustomer: true,
      isPhysicalPerson: true,
    });

    await repo.create(entity);

    await useCase.execute({ id: entity.uuid });

    expect(async () => {
      await new FindUserUsecase(repo).execute({ id: entity.uuid });
    }).rejects.toThrow(NotFoundError);
  });
});
