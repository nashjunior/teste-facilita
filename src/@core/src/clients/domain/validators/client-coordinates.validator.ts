import { YupValidator } from '#seedwork/domain/validators';
import * as yup from 'yup';
import { IClientCoordinateProps } from '../entities/client-coordinates';

export class ClientCoordinateValidator extends YupValidator<IClientCoordinateProps> {
  constructor() {
    super(
      yup.object().shape({
        latitude: yup.number().required(),
        longitude: yup.number().required(),
      }),
    );
  }
}
