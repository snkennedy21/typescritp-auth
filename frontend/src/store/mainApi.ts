import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setLocalStorageUserData } from "../utils/localStorageUserData";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If the error is a 403 with a specific message, attempt to refresh tokens
  if (
    result.error &&
    result.error.status === 403 &&
    result.error.data?.error ===
      "Forbidden: Access token expired, please refresh token"
  ) {
    // Attempt to refresh tokens
    const refreshResult = await baseQuery(
      { url: "users/refresh", method: "POST" },
      api,
      extraOptions
    );

    // If refresh was successful, reset userData in local storage and retry the original query
    if (refreshResult.data) {
      setLocalStorageUserData(refreshResult.data);
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Handle failed refresh here (e.g., redirect to login)
    }
  }

  return result;
};

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => {
        return {
          url: "/users/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),

    login: builder.mutation({
      query: (data) => {
        return {
          url: "/users/login",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation({
      query: () => {
        return {
          url: "/users/logout",
          method: "POST",
        };
      },
      invalidatesTags: ["User"],
    }),

    TestAuth: builder.query({
      query: () => {
        return {
          url: "/endpoints/protected",
          method: "GET",
        };
      },
    }),

    UnprotectedEndpoint: builder.query({
      query: () => {
        return {
          url: "/endpoints/unprotected",
          method: "GET",
        };
      },
    }),

    refreshToken: builder.mutation({
      query: () => {
        return {
          url: "/users/refresh",
          method: "POST",
        };
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useUnprotectedEndpointQuery,
  useTestAuthQuery,
  useRefreshTokenMutation,
} = mainApi;
