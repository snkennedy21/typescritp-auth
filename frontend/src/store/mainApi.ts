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
    result.error.data?.error ===
      "Forbidden: Access token expired, please refresh token"
  ) {
    console.log("refreshing tokens");
    // Attempt to refresh tokens
    const refreshResult = await baseQuery(
      { url: "users/refresh", method: "POST" },
      api,
      extraOptions
    );

    console.log("refreshResult: ", refreshResult);

    if (refreshResult.data) {
      // Store the new tokens in your state
      // api.dispatch(
      //   authActions.setTokens({
      //     accessToken: refreshResult.data.newAccessToken,
      //     refreshToken: refreshResult.data.newRefreshToken,
      //   })
      // );

      // Retry the original query with new token
      result = await baseQuery(args, api, extraOptions);

      console.log("result: ", result);
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
        console.log("Testing auth");
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
        console.log("refreshing token");
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
