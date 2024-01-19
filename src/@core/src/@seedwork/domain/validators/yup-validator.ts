import * as yup from 'yup';
import { IErrorField, IValidatorFields } from './ivalidator';

export abstract class YupValidator<T, P = T> implements IValidatorFields<T, P> {
  protected schema: yup.AnySchema;
  errors: IErrorField;
  validatedData: P;

  constructor(schema: yup.AnySchema) {
    this.schema = schema;
  }

  async validate(data: any): Promise<boolean> {
    try {
      this.validatedData = await this.schema.validate(data, {
        abortEarly: false,
      });

      return true;
    } catch (error) {
      if (!(error instanceof yup.ValidationError)) throw error;
      this.errors = {};

      error.inner.forEach(err => {
        if (!this.errors[err.path as string])
          this.errors[err.path as string] = [];
        this.errors[err.path as string].push(...err.errors);
      });

      return false;
    }
  }
}
