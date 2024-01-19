import { IValidatorFields } from '#seedwork/domain/validators/ivalidator';
import {
  IUserProps,
} from '../entities';
import { UserValidator } from './user.validator';


export class UserValidatorFactory {
  static create(): IValidatorFields<IUserProps> {
    return new UserValidator();
  }
}

