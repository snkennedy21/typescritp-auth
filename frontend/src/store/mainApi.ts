import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    result.error.status === 403 &&
    result.error.data.error === "Forbidden: Access token expired"
  ) {
    // Perform refresh token logic here
    const refreshResult = await baseQuery("/users/refresh", api, extraOptions);

    if (refreshResult.error) {
      // Retry the original query with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Handle case where refresh also fails (e.g., logout the user or redirect to login)
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
