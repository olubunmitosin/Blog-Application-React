import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostInterface } from "../../models/PostInterface";

export const postAPI = createApi({
  reducerPath: "postAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_HOST_URL}`,
  }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    fetchAllPosts: build.query<PostInterface[], number>({
      query: (limit: number = 9, page: number = 1) => ({
        url: `/user/posts`,
        params: {
          _limit: limit,
          _page: page,
        },
      }),
      providesTags: (result) => ["Post"],
    }),
    getSinglePost: build.query({
      query: (postId) => `/posts/${postId}`,
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
        url: `/posts/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
