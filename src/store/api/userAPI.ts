import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthLoginInterface } from "../../models/AuthLoginInterface";
import authHeader from "../../services/auth.header";
import { AuthRegisterInterface } from "../../models/AuthRegisterInterface";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_HOST_URL}`,
    prepareHeaders: (headers) => {
      const token = authHeader();
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    loginUser: build.mutation<AuthLoginInterface, AuthLoginInterface>({
      query: (post) => ({
        url: `/auth/login`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["User"],
    }),
    registerUser: build.mutation<AuthRegisterInterface, AuthRegisterInterface>({
      query: (post) => ({
        url: `/auth/register`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["User"],
    }),
    logoutUser: build.mutation({
      query: (post) => ({
        url: `/user/logout`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
