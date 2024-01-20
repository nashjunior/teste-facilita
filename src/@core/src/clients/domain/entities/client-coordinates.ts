import {
  Entity,
  IAuditJSONProps,
  IAuditProps,
} from '#seedwork/domain/entities';
import { UniqueEntityId } from '#seedwork/domain/value-objects';
import { ClientCoordinateValidatorFactory } from '../validators';
import { EntityValidationError } from '#seedwork/domain/errors';
import { Client } from '.';

export type IClientCoordinateProps = {
  latitude: string;
  longitude: string;
};

export type IClientCoordinateJsonProps = Required<
  { id: string } & IClientCoordinateProps
>;

export class ClientCoordinate extends Entity<
  IClientCoordinateProps,
  IClientCoordinateJsonProps
> {
  private client_user: Client;
  private constructor(
    readonly clientuser: Client,
    readonly props: IClientCoordinateProps,
    id?: UniqueEntityId,
    audit?: IAuditProps,
  ) {
    super(props, id, audit);
    this.client_user = clientuser;
    this.latitude = props.latitude;
    this.longitude = props.longitude;
  }

  static async create(
    client: Client,
    props: IClientCoordinateProps,
    id?: UniqueEntityId,
    audit?: IAuditProps,
  ) {
    const data = await ClientCoordinate.validate(props);
    return new ClientCoordinate(client, data, id, audit);
  }

  private static async validate(
    props: IClientCoordinateProps,
  ): Promise<IClientCoordinateProps> {
    const validator = ClientCoordinateValidatorFactory.create();
    const isValidated = await validator.validate(props);

    if (!isValidated) throw new EntityValidationError(validator.errors);

    return validator.validatedData;
  }

  async update(props: IClientCoordinateProps) {
    const data = await ClientCoordinate.validate(props);
    this.latitude = data.latitude;
    this.longitude = data.longitude;
  }

  get client(): Client {
    return this.client_user;
  }

  get latitude() {
    return this.props.latitude;
  }

  private set latitude(newLatitude: string) {
    this.props.latitude = newLatitude;
  }

  get longitude() {
    return this.props.longitude;
  }

  private set longitude(newLongitude: string) {
    this.props.longitude = newLongitude;
  }

  toJSON(): Required<
    { id: string; clientId: string } & IClientCoordinateJsonProps
  > &
    IAuditJSONProps {
    return {
      id: this.uuid,
      clientId: this.client.toJSON().id,
      latitude: this.latitude,
      longitude: this.longitude,
      ...this.jsonAudit,
    };
  }
}
