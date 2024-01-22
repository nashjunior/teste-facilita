import { InvalidUUIDError } from '../errors';

import { v4 as uuidV4, validate as uuidValidate } from 'uuid';
import { ValueObject } from './value-object';

export class UniqueEntityId extends ValueObject<string> {
  constructor(readonly uuid?: string) {
    super(uuid ?? uuidV4());

    this.validate();
  }

  private validate() {
    const isValiidUUID = uuidValidate(this.value);

    if (!isValiidUUID) throw new InvalidUUIDError();
  }
}
