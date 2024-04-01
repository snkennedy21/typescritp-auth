import { useEffect } from "react";
import { authenticateUser } from "../store/authSlice";

/**
 * Custom hook to check authentication and handle token refresh.
 * @param {object} error - The error object returned from useTestAuthQuery.
 * @param {function} refreshTokens - Mutation function from useRefreshTokenMutation.
 * @param {function} dispatch - The Redux dispatch function.
 * @param {function} refetch - Function to refetch authentication status.
 */
const useAuthCheck = (error, refreshTokens, dispatch, refetch) => {
  useEffect(() => {
    if (
      error &&
      error.data &&
      error.data.error === "Forbidden: Access token expired"
    ) {
      refreshTokens()
        .unwrap()
        .then(() => {
          dispatch(authenticateUser()); // Assuming authenticateUser is an action creator
          refetch();
        })
        .catch((refreshError) =>
          console.error("Refresh token error:", refreshError)
        );
    }
  }, [error, refreshTokens, dispatch, refetch]);
};

export default useAuthCheck;
