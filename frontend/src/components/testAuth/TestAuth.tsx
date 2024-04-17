import { useTestAuthQuery, useRefreshTokenMutation } from "../../store/mainApi";
import { useSelector, useDispatch } from "react-redux";
// import useAuthCheck from "../../customHooks/useAuthCheck";

const TestAuth = () => {
  const { data, error, isLoading } = useTestAuthQuery();
  const currentUser = useSelector((state) => state.auth.currentUser);

  console.log("currentUser: ", currentUser);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.data.error}</div>;
  }

  return <div>{data.message}</div>;
};

export default TestAuth;
