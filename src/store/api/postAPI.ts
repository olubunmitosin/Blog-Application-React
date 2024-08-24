import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostInterface } from "../../models/PostInterface";
import authHeader from "../../services/auth.header";

export const postAPI = createApi({
  reducerPath: "postAPI",
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
  tagTypes: ["Post"],
  endpoints: (build) => ({
    fetchAllPosts: build.query({
      query: () => ({
        url: `/user/posts`
      }),
      providesTags: (result) => ["Post"],
    }),
    getSinglePost: build.query({
      query: (postId) => `/user/posts/single/${postId}`,
    }),
    createPost: build.mutation<PostInterface, PostInterface>({
      query: (post) => ({
        url: `/user/posts/create`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: build.mutation<PostInterface, PostInterface>({
      query: (post) => ({
        url: `/user/posts/update`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: build.mutation<PostInterface, PostInterface>({
      query: (post) => ({
        url: `/user/posts/delete`,
        method: "POST",
        body: {"id": post._id}
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
