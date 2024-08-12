export default interface LoginType {
  email: string;
  password: string; //Hash of password
}

export interface ResponseLoginType {
  access_token: string;
}
