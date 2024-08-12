export const storeAccessToken = (token: string): void => {
  sessionStorage.setItem("accessToken", token);
};

export const getAccessToken = (): string | null => {
  return sessionStorage.getItem("accessToken");
};
