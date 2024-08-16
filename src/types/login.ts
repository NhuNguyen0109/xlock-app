export default interface LoginType {
  identity: string;
  password: string; //Hash of password
}

export interface ResponseLoginType {
  access_token: string;
}
