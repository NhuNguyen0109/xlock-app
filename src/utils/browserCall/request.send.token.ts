export default function requestSendToken(access_token: string): Promise<void> {
  const id = import.meta.env.VITE_EXTENSION_ID;

  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      id,
      { access_token: access_token, type: "SEND_TOKEN" },
      (res: { success: boolean }) => {
        if (res.success) {
          console.log("SEND TOKEN SUCCESS");
          resolve();
        } else {
          console.log("SEND TOKEN FAILED");
          reject(new Error("SEND TOKEN FAILED"));
        }
      }
    );
  });
}
