import Cookies from "js-cookie";
import { getAccessToken } from "../access-token";
import { getDeviceId } from "../device-id";

interface ApiCallParams<V> {
  endpoint: string;
  method?: string;
  requestData?: V;
}

type ApiResponse<T> = {
  code: number;
  status: string;
  data: T;
};

const apiCall = async <T, V = undefined>({
  endpoint,
  method = "GET",
  requestData,
}: ApiCallParams<V>): Promise<ApiResponse<T>> => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
  const token = getAccessToken();
  const deviceId = getDeviceId();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const cookieValue = (token ? `auth=${token};` : "") + (deviceId ?? "");
  Cookies.set("authDevice", cookieValue);

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: method !== "GET" ? JSON.stringify(requestData) : undefined,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export default apiCall;
