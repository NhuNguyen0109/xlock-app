import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/login.slice";
import { apiCall, ApiEndpoints } from "../utils";
import requestSendData from "./browserCall/request.send.data";
// import { getConcatStr } from "./concat-text";
import { storeAccessToken } from "./access-token";
import LoginType, { ResponseLoginType } from "../types/login";
import { RootState } from "../store";

export const useSubmitLogin = () => {
  const dispatch = useDispatch();
  const salt = useSelector(
    (state: RootState) => state.register.rsa_key_pair.salt
  );

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

      const userExtSuccess = await sendUserExt({
        password,
        access_token,
        ...(salt !== "" && { salt }),
      });
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
  salt,
}: {
  password: string;
  access_token: string;
  salt?: string;
}) => {
  try {
    // const concatStr = getConcatStr();
    await requestSendData(access_token, password, ...(salt ? [salt] : []));
    return true;
  } catch (error) {
    console.error("Error sending user extension data:", error);
    return false;
  }
};
