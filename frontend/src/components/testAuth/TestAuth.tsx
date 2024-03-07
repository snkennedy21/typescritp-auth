import { useTestAuthQuery } from "../../store/mainApi";

const TestAuth = () => {
  const { data, error, isLoading } = useTestAuthQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>You Are Not Authenticated!</div>;
  }

  return <div>Yes</div>;
};

export default TestAuth;
