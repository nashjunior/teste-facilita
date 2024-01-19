import { IUserProps } from '#clients/domain/entities';
import { IValidatorFields } from '#seedwork/domain/validators';
import { UserValidator } from '../user.validator';

describe('Role validator tests', () => {
  let userValidator: IValidatorFields<IUserProps>;

  beforeEach(() => {
    userValidator = new UserValidator();
  });

  it('should implement validator to match interface', async () => {
    expect(userValidator?.validate).toBeInstanceOf(Function);
    const validatorSpy = jest.spyOn(userValidator, 'validate');

    await userValidator.validate({});
    expect(validatorSpy).toHaveBeenCalledWith({});
  });

  it('invalidation cases for name', async () => {
    expect(await userValidator.validate({ name: undefined })).toBeFalsy();
    expect(userValidator.errors.name).toStrictEqual([
      'name is a required field',
    ]);
    expect(userValidator.validatedData).toBeUndefined();

    expect(await userValidator.validate({ name: null })).toBeFalsy();

    expect(await userValidator.validate({ name: '' })).toBeFalsy();
  });

  it('invalidation cases for username', async () => {
    expect(await userValidator.validate({ username: undefined })).toBeFalsy();
    expect(userValidator.errors.username).toStrictEqual([
      'username is a required field',
    ]);
    expect(userValidator.validatedData).toBeUndefined();

    expect(await userValidator.validate({ username: null })).toBeFalsy();

    expect(await userValidator.validate({ username: '' })).toBeFalsy();
    expect(await userValidator.validate({ username: 1 })).toBeFalsy();
  });

  it('invalidation cases for password', async () => {
    expect(await userValidator.validate({ password: undefined })).toBeFalsy();
    expect(userValidator.errors.password).toStrictEqual([
      'password is a required field',
    ]);
    expect(userValidator.validatedData).toBeUndefined();

    expect(await userValidator.validate({ password: null })).toBeFalsy();

    expect(await userValidator.validate({ password: '' })).toBeFalsy();
    expect(
      await userValidator.validate({ password: 'a'.repeat(1000) }),
    ).toBeFalsy();
    expect(await userValidator.validate({ password: 1 })).toBeFalsy();
  });

  it('invalidation cases for isCustomer', async () => {
    expect(await userValidator.validate({ isCustomer: undefined })).toBeFalsy();
    expect(userValidator.errors.isCustomer).toStrictEqual([
      'isCustomer is a required field',
    ]);
    expect(userValidator.validatedData).toBeUndefined();

    expect(await userValidator.validate({ isCustomer: null })).toBeFalsy();

    expect(await userValidator.validate({ isCustomer: '' })).toBeFalsy();
    expect(
      await userValidator.validate({ isCustomer: 'a'.repeat(1000) }),
    ).toBeFalsy();
    expect(await userValidator.validate({ isCustomer: 1 })).toBeFalsy();
  });

  it('invalidation cases for isPhysicalPerson', async () => {
    expect(
      await userValidator.validate({ isPhysicalPerson: undefined }),
    ).toBeFalsy();
    expect(userValidator.errors.isPhysicalPerson).toStrictEqual([
      'isPhysicalPerson is a required field',
    ]);
    expect(userValidator.validatedData).toBeUndefined();

    expect(
      await userValidator.validate({ isPhysicalPerson: null }),
    ).toBeFalsy();

    expect(await userValidator.validate({ isPhysicalPerson: '' })).toBeFalsy();
    expect(
      await userValidator.validate({ isPhysicalPerson: 'a'.repeat(1000) }),
    ).toBeFalsy();
    expect(await userValidator.validate({ isPhysicalPerson: 1 })).toBeFalsy();
  });

  it('should validate user validator', async () => {
    const validateData = {
      name: 'some-name',
      username: 'auehaueh',
      password: '123123',
      isCustomer: false,
      isPhysicalPerson: true,
    };
    expect(await userValidator.validate(validateData)).toBeTruthy();
    expect(userValidator.errors).toBeUndefined();
    expect(userValidator.validatedData).toStrictEqual(validateData);
  });
});
