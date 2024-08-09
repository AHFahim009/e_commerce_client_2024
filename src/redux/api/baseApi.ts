// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { tagProvider } from "./endpoints/tagTypes";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://book-e-show-backend-2024-2.onrender.com/api/v1",

  prepareHeaders: (header, { getState }) => {
    const { token } = (getState() as RootState).auth;
    if (token) {
      header.set("Authorization", token);
    }
    return header
  },
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,

  endpoints: () => ({}),
  tagTypes: tagProvider
});
