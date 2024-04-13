import { useTestAuthQuery, useRefreshTokenMutation } from "../../store/mainApi";
import { useSelector, useDispatch } from "react-redux";
// import useAuthCheck from "../../customHooks/useAuthCheck";

const TestAuth = () => {
  const { data, error, isLoading } = useTestAuthQuery();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // console.log("data: ", data);
  // console.log("isAuthenticated: ", isAuthenticated);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || data === undefined) {
    return <div>No, you are not authenticated</div>;
  }

  return <div>{data.message}</div>;
};

export default TestAuth;
