import {
  Entity,
  IAuditJSONProps,
  IAuditProps,
} from '#seedwork/domain/entities';
import { UniqueEntityId } from '#seedwork/domain/value-objects';
import { ClientValidatorFactory } from '../validators';
import { EntityValidationError } from '#seedwork/domain/errors';

export type IClientProps = {
  name: string;
  email: string;
  phoneNumber: string;
};

export type IClientJsonProps = Required<IClientProps>;

export class Client extends Entity<IClientProps, IClientJsonProps> {
  private constructor(
    readonly props: IClientProps,
    uuid?: UniqueEntityId,
    audit?: IAuditProps,
  ) {
    super(props, uuid, audit);

    this.name = props.name;
    this.email = props.email;
    this.phoneNumber = props.phoneNumber;
  }

  static async create(
    props: IClientProps,
    id?: UniqueEntityId,
    audit?: IAuditProps,
  ) {
    const data = await Client.validate(props);
    return new Client(data, id, audit);
  }

  private static async validate(props: IClientProps): Promise<IClientProps> {
    const validator = ClientValidatorFactory.create();
    const isValidated = await validator.validate(props);

    if (!isValidated) throw new EntityValidationError(validator.errors);

    return validator.validatedData;
  }

  async update(props: IClientProps) {
    const data = await Client.validate(props);
    this.name = data.name;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
  }

  get name() {
    return this.props.name;
  }

  private set name(newname: string) {
    this.props.name = newname;
  }

  get email() {
    return this.props.email;
  }

  private set email(newEmail: string) {
    this.props.email = newEmail;
  }

  get phoneNumber() {
    return this.props.phoneNumber;
  }

  private set phoneNumber(newphoneNumber: string) {
    this.props.phoneNumber = newphoneNumber;
  }

  toJSON(): Required<{ id: string } & IClientJsonProps> & IAuditJSONProps {
    return {
      id: this.uuid,
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      ...this.jsonAudit,
    };
  }
}
