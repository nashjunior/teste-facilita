import { YupValidator } from '#seedwork/domain/validators';
import { IUserProps } from '../entities';
import * as yup from 'yup';

export class UserValidator extends YupValidator<IUserProps> {
  constructor() {
    super(
      yup
        .object()
        .shape({
          name: yup.string().required().max(255),
          username: yup.string().required().max(50),
          password: yup.string().required().max(255),
          isCustomer: yup.boolean().required(),
          isPhysicalPerson: yup.boolean().required(),
        })
        .required()
        .noUnknown(),
    );
  }
}
