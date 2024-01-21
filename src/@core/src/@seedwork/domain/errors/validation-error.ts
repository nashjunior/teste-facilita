import { IErrorField } from '#seedwork/domain/validators/ivalidator';

export class ValidationError extends Error {}

export class EntityValidationError extends Error {
  constructor(readonly error: IErrorField) {
    super('Entity Validation Error');
    this.name = 'EntityValidationError';
  }
}
