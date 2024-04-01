import { useTestAuthQuery, useRefreshTokenMutation } from "../../store/mainApi";
import { useSelector, useDispatch } from "react-redux";
import useAuthCheck from "../../customHooks/useAuthCheck";

const TestAuth = () => {
  const { data, error, isLoading, refetch } = useTestAuthQuery();
  const dispatch = useDispatch();
  const [refreshTokens] = useRefreshTokenMutation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useAuthCheck(error, refreshTokens, dispatch, refetch);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>No, you are not authenticated</div>;
  }

  return <div>Yes, you are authenticated</div>;
};

export default TestAuth;
