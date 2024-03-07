import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),

  tagTypes: ["User"],

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/users/create",
          method: "POST",
          body: data,
          credentials: "include",
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
          credentials: "include",
        };
      },
      invalidatesTags: ["User"],
    }),

    TestAuth: builder.query({
      query: () => {
        return {
          url: "/endpoints/protected",
          method: "GET",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useTestAuthQuery } =
  mainApi;
