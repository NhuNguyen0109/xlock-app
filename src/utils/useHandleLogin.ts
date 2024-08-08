import { useDispatch } from "react-redux";
import { loginActions } from "../store/login.slice";
import { apiCall } from "../utils";
import requestSendData from "./browserCall/request.send.data";
import { getConcatStr } from "./concat-text";
import { storeAccessToken } from "./access-token";
import LoginType, { ResponseLoginType } from "../types/login";
// import { base64ToCryptoKey } from "./handleHassPassType";

export const useSubmitLogin = () => {
  const dispatch = useDispatch();
  return ({ email, password }: LoginType) => {
    apiCall<ResponseLoginType, LoginType>({
      method: "POST",
      endpoint: "/api/v1/auth/login",
      requestData: { email, password },
    })
      .then((response) => {
        const access_token = response.data.access_token;
        storeAccessToken(access_token);
        dispatch(loginActions.handleSuccessLogin());
        sendUserExt({ password, access_token });
      })
      .catch((error) => {
        console.error("Login failed:", error);
        dispatch(loginActions.handleFailureLogin());
      });
  };
};

export const useLoggedIn = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(loginActions.handleSuccessLogin());
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
