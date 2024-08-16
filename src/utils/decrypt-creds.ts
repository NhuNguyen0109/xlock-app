import requestDecrypt from "./browserCall/request.decrypt";

export type DecryptedCreds = {
  credential: string;
  password: string;
  raw_creds: string;
} | null;

const getDecryptedCreds = async (
  text: string,
  type_creds: string,
  enc_pri?: string
): Promise<DecryptedCreds> => {
  try {
    const response = await requestDecrypt(
      text,
      type_creds,
      ...(enc_pri ? [enc_pri] : [])
    );
    if (response) {
      const decryptedCreds = response.plaintext.split("::");
      if (decryptedCreds.length >= 2) {
        return {
          raw_creds: response.plaintext,
          credential: decryptedCreds[0],
          password: decryptedCreds[1],
        };
      } else {
        console.error("Decrypted credentials array is too short.");
        return null;
      }
    } else {
      console.error("Response is null or undefined.");
      return null;
    }
  } catch (error) {
    console.error("Failed to decrypt credentials", error);
    return null;
  }
};

export default getDecryptedCreds;
