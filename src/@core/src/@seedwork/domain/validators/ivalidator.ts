export type IErrorField = { [field: string]: string[] };

export interface IValidatorFields<InputProps, Output = InputProps> {
  errors: IErrorField;
  validatedData: Output;
  validate(data: any): boolean | Promise<boolean>;
}
