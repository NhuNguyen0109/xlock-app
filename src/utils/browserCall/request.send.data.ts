export default function requestSendData(
  access_token: string,
  password: string,
  concatStr: string
): Promise<void> {
  const id = import.meta.env.VITE_EXTENSION_ID;

  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      id,
      {
        access_token: access_token,
        type: "SEND_DATA",
        password: password,
        concatStr: concatStr,
      },
      (res: { success: boolean }) => {
        if (res.success) {
          resolve();
        } else {
          reject(new Error("SEND DATA FAILED"));
        }
      }
    );
  });
}
