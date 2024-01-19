import { UniqueEntityId } from '../value-objects/unique-id';

export type IAuditProps =
  | { createdAt?: Date; updatedAt?: Date; deletedAt?: Date }
  | undefined;

export type IAuditJSONProps = {
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

export abstract class Entity<Props = Record<string, any>, JsonProps = Props> {
  public readonly uniqueEntityID: UniqueEntityId;

  private createdAtValue: Date;
  private updateddAtValue: Date | null;
  private deletedAtValue: Date | null;

  constructor(
    public readonly props: Props,
    id?: UniqueEntityId,
    audtiProps?: IAuditProps,
  ) {
    this.uniqueEntityID = id ?? new UniqueEntityId();
    this.createdAt = audtiProps?.createdAt ?? new Date();
    this.updatedAt = audtiProps?.updatedAt ?? null;
    this.deletedAt = audtiProps?.deletedAt ?? null;
  }

  get uuid() {
    return this.uniqueEntityID.value;
  }

  get createdAt() {
    return this.createdAtValue;
  }

  private set createdAt(newDate: Date) {
    this.createdAtValue = newDate;
  }

  private set updatedAt(newDate: Date | null) {
    this.updateddAtValue = newDate;
  }

  get updatedAt(): Date | null {
    return this.updateddAtValue;
  }

  private set deletedAt(newDate: Date | null) {
    this.deletedAtValue = newDate;
  }

  get deletedAt(): Date | null {
    return this.deletedAtValue;
  }

  protected get jsonAudit() {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  abstract toJSON(): Required<{ id: string }> & JsonProps & IAuditJSONProps;
}
