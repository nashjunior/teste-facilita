import { YupValidator } from '../yup-validator';
import * as yup from 'yup';

class StubYupValidator extends YupValidator<{ field: string }> {
  constructor() {
    super(yup.object({ field: yup.string().required() }));
  }
}

describe('Integration tests for yup validation', () => {
  it('should validate with errors', async () => {
    const validator = new StubYupValidator();

    expect(await validator.validate(null)).toBeFalsy();
    expect(validator.errors).toStrictEqual({
      '': ['this cannot be null'],
    });

    expect(await validator.validate({})).toBeFalsy();
    expect(validator.errors).toStrictEqual({
      field: ['field is a required field'],
    });
  });

  it('should be valid', async () => {
    const validator = new StubYupValidator();
    const valueToValidate = { field: 'somevalue' };

    expect(await validator.validate(valueToValidate)).toBeTruthy();
    expect(validator.errors).toBeUndefined();
    expect(validator.validatedData).toStrictEqual(valueToValidate);
  });
});
