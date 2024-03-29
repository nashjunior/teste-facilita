import { YupValidator } from '#seedwork/domain/validators';
import { IClientProps } from '../entities';
import * as yup from 'yup';

export class ClientValidator extends YupValidator<IClientProps> {
  constructor() {
    super(
      yup
        .object()
        .shape({
          name: yup.string().required().max(255),
          email: yup.string().email().max(255),
          phoneNumber: yup
            .string()
            .min(10)
            .max(20)
            .matches(/^\+?\d+$/),
        })
        .required()
        .noUnknown(),
    );
  }
}
