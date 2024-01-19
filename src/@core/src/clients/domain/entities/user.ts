import {
  Entity,
  IAuditJSONProps,
  IAuditProps,
} from '#seedwork/domain/entities';
import { UniqueEntityId } from '#seedwork/domain/value-objects';
import { UserValidatorFactory } from '../validators';
import { EntityValidationError } from '#seedwork/domain/errors';

export type IUserProps = {
  name: string;
  username: string;
  password: string;
  isCustomer: boolean;
  isPhysicalPerson: boolean;
};

export type IUserJsonProps = Required<
  { id: string } & Omit<IUserProps, 'password'>
>;

export class User extends Entity<IUserProps, IUserJsonProps> {
  private constructor(
    readonly props: IUserProps,
    id?: UniqueEntityId,
    audit?: IAuditProps,
  ) {
    super(props, id, audit);
    this.name = props.name;
    this.password = props.password;
    this.username = props.username;
    this.isPhysicalPerson = props.isPhysicalPerson;
    this.isCustomer = props.isCustomer;
  }

  static async create(
    props: IUserProps,
    id?: UniqueEntityId,
    audit?: IAuditProps,
  ) {
    const data = await User.validate(props);
    return new User(data, id, audit);
  }

  private static async validate(props: IUserProps): Promise<IUserProps> {
    const validator = UserValidatorFactory.create();
    const isValidated = await validator.validate(props);

    if (!isValidated) throw new EntityValidationError(validator.errors);

    return validator.validatedData;
  }

  async update(props: IUserProps) {
    const data = await User.validate(props);
    this.name = data.name;
    this.name = data.name;
    this.password = data.password;
    this.username = data.username;
    this.isPhysicalPerson = data.isPhysicalPerson;
    this.isCustomer = data.isCustomer;
  }

  get name() {
    return this.props.name;
  }

  private set name(newName: string) {
    this.props.name = newName;
  }

  get username() {
    return this.props.username;
  }

  private set username(newUsername: string) {
    this.props.username = newUsername;
  }

  private set password(newPassword: string) {
    this.props.password = newPassword;
  }

  get isPhysicalPerson() {
    return this.props.isPhysicalPerson;
  }

  private set isPhysicalPerson(newisPhysicalPerson: boolean) {
    this.props.isPhysicalPerson = newisPhysicalPerson;
  }

  get isCustomer() {
    return this.props.isCustomer;
  }

  private set isCustomer(newisCustomer: boolean) {
    this.props.isCustomer = newisCustomer;
  }

  toJSON(): Required<{ id: string } & IUserJsonProps> & IAuditJSONProps {
    return {
      id: this.uuid,
      username: this.username,
      name: this.name,
      isCustomer: this.isCustomer,
      isPhysicalPerson: this.isPhysicalPerson,
      ...this.jsonAudit,
    };
  }
}
