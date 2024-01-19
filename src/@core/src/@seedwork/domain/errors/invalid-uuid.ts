export class InvalidUUIDError extends Error {
  constructor() {
    super('Id must be a valid UUID');
    this.name = 'InvalidUUIDError';
  }
}
