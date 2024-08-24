import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostInterface } from "../../models/PostInterface";
import { ResponseInterface } from "../../models/ResponseInterface";
import authHeader from "../../services/auth.header";
import { removeCredentials } from "../../services/auth.service";

const checkStatusCode = (response: Response, result: any) => {
  if (response.status === 401) {
    removeCredentials();
    return false;
  }
  return true;
};

export const postAPI = createApi({
  reducerPath: "postAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_HOST_URL}`,
    prepareHeaders: (headers) => {
      const token = authHeader();
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    fetchAllPosts: build.query({
      query: () => ({
        url: `/user/posts`,
        validateStatus: checkStatusCode,
      }),
      providesTags: (result) => ["Post"],
    }),
    getSinglePost: build.query({
      query: (postId) => ({
        url: `/user/posts/single/${postId}`,
        validateStatus: checkStatusCode,
      }),
    }),
    createPost: build.mutation<ResponseInterface, PostInterface>({
      query: (post) => ({
        url: `/user/posts/create`,
        method: "POST",
        body: post,
        validateStatus: checkStatusCode,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: build.mutation<ResponseInterface, PostInterface>({
      query: (post) => ({
        url: `/user/posts/update`,
        method: "POST",
        body: post,
        validateStatus: checkStatusCode,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: build.mutation<ResponseInterface, PostInterface>({
      query: (post) => ({
        url: `/user/posts/delete`,
        method: "POST",
        body: { id: post._id },
        validateStatus: checkStatusCode,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
