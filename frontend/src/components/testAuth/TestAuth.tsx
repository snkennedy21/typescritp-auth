import React, { useEffect, useState } from "react";
import { useTestAuthQuery, useRefreshTokenMutation } from "../../store/mainApi";
import { authenticateUser } from "../../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";

const TestAuth = () => {
  const { data, error, isLoading, refetch } = useTestAuthQuery();
  const dispatch = useDispatch();
  const [refreshTokens] = useRefreshTokenMutation();
  const [timer, setTimer] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (error && error.data.error === "Forbidden: Access token expired") {
      refreshTokens()
        .unwrap()
        .then(() => {
          dispatch(authenticateUser());
          refetch();
        })
        .catch((refreshError) =>
          console.error("Refresh token error:", refreshError)
        );
    }
  }, [error, refreshTokens, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: No</div>;
  }

  return (
    <div>{timer ? <div>Cookie expires in: {timer}</div> : <div>Yes</div>}</div>
  );
};

export default TestAuth;
