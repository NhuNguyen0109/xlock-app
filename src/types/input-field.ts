export default interface InputType {
  title: string;
  value: string;
}

export interface DisabledInputType extends InputType {
  src?: string;
  alt?: string;
  actualValue?: string;
}
export interface ActiveInputType extends InputType {
  type: string;
  handleChangeValue?(event: React.ChangeEvent<HTMLInputElement>): void;
}
