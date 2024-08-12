export default function requestEncrypt(
  privateKey: string,
  password: string
): Promise<{
  concatenatedData: string;
  encrypted: string;
  salt: string;
  initializationVector: string;
}> {
  return new Promise((resolve, reject) => {
    const id = import.meta.env.VITE_EXTENSION_ID;
    chrome.runtime.sendMessage(
      id,
      {
        type: "REQUEST_ENCRYPT_PRIVATE_KEY",
        privateKey: privateKey,
        password: password,
      },
      (res: {
        success: boolean;
        encryptedPrivateKey: string;
        salt: string;
        initializationVector: string;
      }) => {
        if (res.success) {
          const concatenatedData = concatenateData(
            res.encryptedPrivateKey,
            res.initializationVector,
            res.salt
          );
          resolve({
            concatenatedData,
            encrypted: res.encryptedPrivateKey,
            salt: res.salt,
            initializationVector: res.initializationVector,
          });
        } else {
          reject(new Error("There is some error"));
        }
      }
    );
  });
}

function concatenateData(
  cipherText: string,
  initializationVector: string,
  salt: string
) {
  // return `${initializationVector}::${salt}`;
  return `${initializationVector}::${salt}::${cipherText}`;
}
