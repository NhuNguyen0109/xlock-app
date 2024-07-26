import { useDispatch } from "react-redux";
import { loginActions } from "../store/login.slice";

export const useSubmitLogin = () => {
  const dispatch = useDispatch();

  return (user_id: string) => {
    dispatch(loginActions.handleSuccessLogin(user_id));
  };
};

export const useLoggedIn = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(loginActions.handleLoggedIn());
  };
};
