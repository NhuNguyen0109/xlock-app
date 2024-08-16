export default interface KeyType {
  public_key: string;
}

export interface PersonalKeyType extends KeyType {
  enc_pri: string;
}
