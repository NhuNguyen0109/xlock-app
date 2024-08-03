// const getCookie = (name: string): string | undefined => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(";").shift();
// };

interface ApiCallParams<T = any> {
  endpoint: string;
  method?: string;
  requestData?: T;
  token?: string;
}

const apiCall = async <T = any>({
  endpoint,
  method = "GET",
  requestData,
  token,
}: ApiCallParams): Promise<any> => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: method !== "GET" ? JSON.stringify(requestData) : undefined,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export default apiCall;
