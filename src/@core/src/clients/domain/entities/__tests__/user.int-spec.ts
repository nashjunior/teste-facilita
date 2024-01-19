import { Entity } from '#seedwork/domain/entities';
import { IUserProps, User } from '../user';
import { EntityValidationError } from '#seedwork/domain/errors';

describe('Integrations tests for user entity', () => {
  it('should inherit from entity base class', async () => {
    const userEntity = await User.create({
      name: 'a',
      username: 'a',
      password: 'a',
      isCustomer: true,
      isPhysicalPerson: false,
    });

    expect(userEntity).toBeInstanceOf(Entity);
  });

  describe('should validate on create', () => {
    it('should throw an error on invalid person on create', async () => {
      expect(async () => {
        await User.create({
          name: undefined as any,
          username: undefined as any,
          password: undefined as any,
          isCustomer: undefined as any,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await User.create({
          name: null as any,
          username: undefined as any,
          password: undefined as any,
          isCustomer: undefined as any,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await User.create({
          name: '' as any,
          username: undefined as any,
          password: undefined as any,
          isCustomer: undefined as any,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await User.create({
          name: 'some name',
          username: null as any,
          password: undefined as any,
          isCustomer: undefined as any,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await User.create({
          name: 'some name',
          username: '',
          password: undefined as any,
          isCustomer: undefined as any,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await User.create({
          name: 'some name',
          username: 'some username',
          password: null as any,
          isCustomer: undefined as any,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await User.create({
          name: 'some name',
          username: 'some username',
          password: '',
          isCustomer: undefined as any,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await User.create({
          name: 'some name',
          username: 'some username',
          password: '',
          isCustomer: null as any,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await User.create({
          name: 'some name',
          username: 'some username',
          password: '',
          isCustomer: '' as any,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await User.create({
          name: 'some name',
          username: 'some username',
          password: '',
          isCustomer: false,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await User.create({
          name: 'some name',
          username: 'some username',
          password: '',
          isCustomer: false,
          isPhysicalPerson: null as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await User.create({
          name: 'some name',
          username: 'some username',
          password: '',
          isCustomer: false,
          isPhysicalPerson: '' as any,
        });
      }).rejects.toThrow(EntityValidationError);
    });

    test('should return a valid entity on create', async () => {
      const props: IUserProps = {
        name: 'somename',
        username: 'username',
        password: 'password',
        isCustomer: true,
        isPhysicalPerson: false,
      };

      const user = await User.create(props);
      expect(user.toJSON()).toMatchObject({
        name: 'somename',
        username: 'username',
        isCustomer: true,
        isPhysicalPerson: false,
      });
    });
  });

  describe('should validate on update', () => {
    it('should throw an error on invalid person on create', async () => {
      const user = await User.create({
        name: 'some-person',
        username: 'some-username',
        password: 'some-password',
        isCustomer: true,
        isPhysicalPerson: false,
      });

      expect(async () => {
        await user.update({
          name: undefined as any,
          username: undefined as any,
          password: undefined as any,
          isCustomer: undefined as any,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await user.update({
          name: null as any,
          username: undefined as any,
          password: undefined as any,
          isCustomer: undefined as any,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await user.update({
          name: '' as any,
          username: undefined as any,
          password: undefined as any,
          isCustomer: undefined as any,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await user.update({
          name: 'some name',
          username: null as any,
          password: undefined as any,
          isCustomer: undefined as any,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await user.update({
          name: 'some name',
          username: '',
          password: undefined as any,
          isCustomer: undefined as any,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await user.update({
          name: 'some name',
          username: 'some username',
          password: null as any,
          isCustomer: undefined as any,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await user.update({
          name: 'some name',
          username: 'some username',
          password: '',
          isCustomer: undefined as any,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await user.update({
          name: 'some name',
          username: 'some username',
          password: '',
          isCustomer: null as any,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await user.update({
          name: 'some name',
          username: 'some username',
          password: '',
          isCustomer: '' as any,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await user.update({
          name: 'some name',
          username: 'some username',
          password: '',
          isCustomer: false,
          isPhysicalPerson: undefined as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await user.update({
          name: 'some name',
          username: 'some username',
          password: '',
          isCustomer: false,
          isPhysicalPerson: null as any,
        });
      }).rejects.toThrow(EntityValidationError);

      expect(async () => {
        await user.update({
          name: 'some name',
          username: 'some username',
          password: '',
          isCustomer: false,
          isPhysicalPerson: '' as any,
        });
      }).rejects.toThrow(EntityValidationError);
    });

    it('should return a valid person', async () => {
      expect.assertions(0);
      const person = await User.create({
        name: 'some-person',
        password: 'pass1',
        username: 'username',
        isPhysicalPerson: true,
        isCustomer: false,
      });
      await person.update({
        isCustomer: true,
        isPhysicalPerson: true,
        name: 'new name',
        password: 'pass123',
        username: 'newusername',
      });
    });
  });
});
