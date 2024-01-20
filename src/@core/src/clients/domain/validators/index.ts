import { IValidatorFields } from '#seedwork/domain/validators/ivalidator';
import { IClientProps } from '../entities';
import { ClientValidator } from './client.validator';
import { ClientCoordinateValidator } from './client-coordinates.validator';
import { IClientCoordinateProps } from '../entities/client-coordinates';

export class ClientValidatorFactory {
  static create(): IValidatorFields<IClientProps> {
    return new ClientValidator();
  }
}
export class ClientCoordinateValidatorFactory {
  static create(): IValidatorFields<IClientCoordinateProps> {
    return new ClientCoordinateValidator();
  }
}
