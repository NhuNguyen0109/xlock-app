export const storeDeviceId = (concatStr: string): void => {
  localStorage.setItem("deviceId", concatStr);
};

export const getDeviceId = (): string => {
  return localStorage.getItem("deviceId") ?? "";
};
