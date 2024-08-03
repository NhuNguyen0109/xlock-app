export default function requestDeviceId(): Promise<{ deviceID: string }> {
  const id = import.meta.env.VITE_EXTENSION_ID;

  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      id,
      { type: "REQUEST_DEVICE_ID" },
      (res: { success: boolean; deviceID: string }) => {
        if (res.success) {
          console.log("GET DEVICE ID SUCCESS");
          resolve({ deviceID: res.deviceID });
        } else {
          console.log("CANNOT GET DEVICE ID");
          reject(new Error("CANNOT GET DEVICE ID"));
        }
      }
    );
  });
}
