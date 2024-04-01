import { useUnprotectedEndpointQuery } from "../../store/mainApi";
import { useSelector } from "react-redux";

const UnprotectedEndpoint = () => {
  const { data, error, isLoading, refetch } = useUnprotectedEndpointQuery();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{data.message}</div>;
};

export default UnprotectedEndpoint;
