import { useTestAuthQuery } from "../../store/mainApi";
import { useSelector } from "react-redux";

const TestAuth = () => {
  const { data, error, isLoading } = useTestAuthQuery();
  const currentUser = useSelector((state) => state.auth.currentUser);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.data.error}</div>;
  }

  return <div>{data.message}</div>;
};

export default TestAuth;
