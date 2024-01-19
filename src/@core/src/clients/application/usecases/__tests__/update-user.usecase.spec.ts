import { NotFoundError } from '#seedwork/domain/errors';
import { UsersInMemoryRepository } from '#clients/infra';
import { User } from '#clients/domain';
import { Usecase as UpdateUserUsecase } from '../update-user';

describe('Update user usecase unit tests', () => {
  let useCase: UpdateUserUsecase;
  let repo: UsersInMemoryRepository;

  beforeEach(() => {
    repo = new UsersInMemoryRepository();
    useCase = new UpdateUserUsecase(repo);
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
      await useCase.execute({
        id: 'auehaueh',
        password: 'newpass',
        isCustomer: false,
        isPhysicalPerson: true,
        name: 'newname',
        username: 'new username',
      });
    }).rejects.toThrow(NotFoundError);
  });

  test('Should update entity', async () => {
    const entity = await User.create({
      name: 'some-name1',
      username: 'some-username',
      password: 'some-password',
      isCustomer: true,
      isPhysicalPerson: true,
    });

    await repo.create(entity);

    const props = {
      password: 'newpass',
      isCustomer: false,
      isPhysicalPerson: true,
      name: 'newname',
      username: 'new username',
    };

    entity.update(props);

    expect(await useCase.execute({ id: entity.uuid, ...props })).toMatchObject(
      entity.toJSON(),
    );
  });
});
