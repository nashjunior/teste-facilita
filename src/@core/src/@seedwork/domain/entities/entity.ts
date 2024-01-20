import { UniqueEntityId } from '../value-objects/unique-id';

export type IAuditProps =
  | { createdAt?: Date; updatedAt?: Date; deleted?: boolean }
  | undefined;

export type IAuditJSONProps = {
  createdAt: Date;
  updatedAt: Date | null;
  deleted: boolean;
};

export abstract class Entity<Props = Record<string, any>, JsonProps = Props> {
  public readonly uniqueEntityID: UniqueEntityId;

  private createdAtValue: Date;
  private updateddAtValue: Date | null;
  private deletedValue: boolean;

  constructor(
    public readonly props: Props,
    id?: UniqueEntityId,
    audtiProps?: IAuditProps,
  ) {
    this.uniqueEntityID = id ?? new UniqueEntityId();
    this.createdAt = audtiProps?.createdAt ?? new Date();
    this.updatedAt = audtiProps?.updatedAt ?? null;
    this.deleted = audtiProps?.deleted ?? false;
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

  private set deleted(_deleted: boolean) {
    this.deletedValue = _deleted;
  }

  get deleted(): boolean {
    return this.deletedValue;
  }

  protected get jsonAudit() {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deleted: this.deleted,
    };
  }

  abstract toJSON(): Required<{ id: string }> & JsonProps & IAuditJSONProps;
}
