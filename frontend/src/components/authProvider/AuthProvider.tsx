import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useRefreshTokenMutation } from "../../store/mainApi";
import { authenticateUser, unauthenticateUser } from "../../store/authSlice";
import {
  setLocalStorageUserData,
  clearLocalStorageUserData,
} from "../../utils/localStorageUserData";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [refresh] = useRefreshTokenMutation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const refreshToken = Cookies.get("isRefreshable");

      if (refreshToken) {
        try {
          const userData = await refresh().unwrap();
          setLocalStorageUserData(userData);
          dispatch(authenticateUser(userData));
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      } else {
        clearLocalStorageUserData();
        dispatch(unauthenticateUser());
      }

      setLoading(false);
    };

    initAuth();
  }, [dispatch, refresh]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;
