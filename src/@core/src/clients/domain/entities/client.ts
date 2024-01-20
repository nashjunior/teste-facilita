import {
  Entity,
  IAuditJSONProps,
  IAuditProps,
} from '#seedwork/domain/entities';
import { UniqueEntityId } from '#seedwork/domain/value-objects';
import { ClientValidatorFactory } from '../validators';
import { EntityValidationError } from '#seedwork/domain/errors';

export type IClientProps = {
  nome: string;
  endereco: string;
  email: string;
  telefone: string;
};

export type IClientJsonProps = Required<IClientProps>;

export class Client extends Entity<IClientProps, IClientJsonProps> {
  private constructor(
    readonly props: IClientProps,
    uuid?: UniqueEntityId,
    audit?: IAuditProps,
  ) {
    super(props, uuid, audit);
    this.nome = props.nome;
    this.endereco = props.endereco;
    this.email = props.email;
    this.telefone = props.telefone;
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
    this.nome = data.nome;
    this.endereco = data.endereco;
    this.email = data.email;
    this.telefone = data.telefone;
  }

  get nome() {
    return this.props.nome;
  }

  private set nome(newNome: string) {
    this.props.nome = newNome;
  }

  get endereco() {
    return this.props.endereco;
  }

  private set endereco(newEndereco: string) {
    this.props.endereco = newEndereco;
  }

  get email() {
    return this.props.email;
  }

  private set email(newEmail: string) {
    this.props.email = newEmail;
  }

  get telefone() {
    return this.props.telefone;
  }

  private set telefone(newTelefone: string) {
    this.props.telefone = newTelefone;
  }

  toJSON(): Required<{ id: string } & IClientJsonProps> & IAuditJSONProps {
    return {
      id: this.uuid,
      nome: this.nome,
      endereco: this.endereco,
      email: this.email,
      telefone: this.telefone,
      ...this.jsonAudit,
    };
  }
}
