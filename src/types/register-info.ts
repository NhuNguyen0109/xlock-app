export default interface RegisterInfo {
  username: string;
  email: string;
  password: string; // HashedPassword in Base64
  fullname: string;
  dob: string;
  address: string;
  phone_number: string;
  gender: string;
  country: string;
  backup_email: string;
  rsa_key_pair: {
    public: string;
    enc_pri: string;
    salt: string;
  };
}

export interface ResponseRegisterInfo {}
