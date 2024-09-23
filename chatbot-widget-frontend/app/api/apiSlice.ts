import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { Message } from "../types";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], void>({
      query: () => `/messages`,
    }),
  }),
});

export const { useGetMessagesQuery } = apiSlice;
