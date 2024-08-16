import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/login.slice";
import { apiCall, ApiEndpoints } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../utils/access-token";
import Auth, { ResponseAuth } from "../../types/verify";

interface ProtectedRouteProps {
  allowed?: boolean;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const access_token = getAccessToken();
  const dispatch = useDispatch();

  if (!access_token) {
    dispatch(loginActions.handleFailureLogin());
    return <Navigate to="/login" />;
  }

  const { data, isSuccess, isError } = useQuery<ResponseAuth>({
    queryKey: ["accesstoken"],
    queryFn: async () => {
      const response = await apiCall<ResponseAuth, Auth>({
        endpoint: ApiEndpoints.Verify,
        method: "POST",
        requestData: { access_token },
      });
      return response.data;
    },
  });

  if (isSuccess) {
    if (data && data.is_valid) {
      dispatch(loginActions.handleSuccessLogin());
      return <>{children}</>;
    } else {
      dispatch(loginActions.handleFailureLogin());
      return <Navigate to="/login" />;
    }
  }

  if (isError) {
    dispatch(loginActions.handleFailureLogin());
    return <Navigate to="/login" />;
  }

  return null;
  // return <>{children}</>;
};

export default ProtectedRoute;
