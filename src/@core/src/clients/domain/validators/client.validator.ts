import { YupValidator } from '#seedwork/domain/validators';
import { IClientProps } from '../entities';
import * as yup from 'yup';

export class ClientValidator extends YupValidator<IClientProps> {
  constructor() {
    super(
      yup
        .object()
        .shape({
          nome: yup.string().required().max(255),
          endereco: yup.string().required().max(255),
          email: yup.string().email().max(255),
          telefone: yup.string().max(20),
        })
        .required()
        .noUnknown(),
    );
  }
}
