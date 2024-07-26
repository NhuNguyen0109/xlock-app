const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

interface ApiCallParams<T = any> {
  endpoint: string;
  method?: string;
  requestData?: T;
}

const apiCall = async <T = any>({
  endpoint,
  method = "GET",
  requestData,
}: ApiCallParams): Promise<any> => {
  // const BASE_URL = import.meta.env.VITE_BASE_URL || "";
  // const cookies = getCookie("access_token");

  // if (!cookies) {
  //   throw new Error("No access token found in cookies.");
  // }

  // const response = await fetch(BASE_URL + endpoint, {
  //   method: method,
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${cookies}`,
  //   },
  //   body: method !== "GET" ? JSON.stringify(requestData) : undefined,
  // });

  // if (!response.ok) {
  //   throw new Error("Network response was not ok");
  // }

  // return response.json();

  console.log(endpoint);
  return "hihi";
};

export default apiCall;
