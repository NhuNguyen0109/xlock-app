export default function requestDecrypt(
  text: string,
  concatStr: string,
  type_creds: string
): Promise<{
  plaintext: string;
}> {
  return new Promise((resolve, reject) => {
    const id = import.meta.env.VITE_EXTENSION_ID;
    chrome.runtime.sendMessage(
      id,
      {
        type: "REQUEST_DECRYPT",
        text,
        type_creds,
        concatStr,
      },
      (res: { success: boolean; plaintext: string }) => {
        if (res.success) {
          resolve({
            plaintext: res.plaintext,
          });
        } else {
          reject(new Error("There is some error"));
        }
      }
    );
  });
}
