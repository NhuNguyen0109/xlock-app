import { useDispatch } from "react-redux";
import { loginActions } from "../store/login.slice";
import { apiCall, ApiEndpoints } from "../utils";
import requestSendData from "./browserCall/request.send.data";
import { getConcatStr } from "./concat-text";
import { storeAccessToken } from "./access-token";
import LoginType, { ResponseLoginType } from "../types/login";

export const useSubmitLogin = () => {
  const dispatch = useDispatch();

  return async ({ identity, password }: LoginType): Promise<boolean> => {
    try {
      const response = await apiCall<ResponseLoginType, LoginType>({
        method: "POST",
        endpoint: ApiEndpoints.Login,
        requestData: { identity, password },
      });

      const access_token = response.data.access_token;
      console.log("new token", access_token);
      storeAccessToken(access_token);
      dispatch(loginActions.handleSuccessLogin());

      const userExtSuccess = await sendUserExt({ password, access_token });
      return userExtSuccess;
    } catch (error) {
      console.error("Login failed:", error);
      dispatch(loginActions.handleFailureLogin());
      return false;
    }
  };
};

const sendUserExt = async ({
  password,
  access_token,
}: {
  password: string;
  access_token: string;
}) => {
  try {
    const concatStr = getConcatStr();
    await requestSendData(access_token, password, concatStr);
    return true;
  } catch (error) {
    console.error("Error sending user extension data:", error);
    return false;
  }
};
