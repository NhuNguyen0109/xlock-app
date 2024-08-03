import { useDispatch } from "react-redux";
import { loginActions } from "../store/login.slice";
import { RootState } from "../store";
import { apiCall } from "../utils";
import requestSendToken from "./browserCall/request.send.data";
// import { base64ToCryptoKey } from "./handleHassPassType";

interface SubmitLoginArgs {
  email: string;
  password: string;
  salt?: string;
  vector?: string;
}

export const useSubmitLogin = () => {
  const dispatch = useDispatch();
  return ({ email, password, salt, vector }: SubmitLoginArgs) => {
    apiCall<{ email: string; password: string }>({
      method: "POST",
      endpoint: "/api/v1/auth/login",
      requestData: { email, password },
    })
      .then((response) => {
        const access_token = response.data.access_token;
        dispatch(loginActions.handleAccessToken(access_token));
        dispatch(loginActions.handleLoggedIn());
        console.log("done sign up");
        if (salt && vector)
          sendUserExt({ password, access_token, salt, vector });
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
    dispatch(loginActions.handleLoggedIn());
  };
};

const sendUserExt = async ({
  salt,
  password,
  access_token,
  vector,
}: {
  salt?: string;
  password: string;
  access_token: string;
  vector?: string;
}) => {
  if (!salt) salt = "default";
  if (!vector) vector = "default";
  try {
    await requestSendToken(access_token, password, salt, vector);
    return true;
  } catch (error) {
    console.error("Error sending user extension data:", error);
    return false;
  }
};
