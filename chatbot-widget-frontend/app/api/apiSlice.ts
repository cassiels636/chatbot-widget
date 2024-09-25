import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { LoginResponse, Message, MessageForm } from "../types";

// Hard-coded login data for simplicity
const USERNAME = "admin-dev";
const USER_PASSWORD = "gtgd%&^im2o3r4&6";

const fetchAccessToken = async () => {
  const response = await fetch(`${BASE_URL}login/access-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify({ username: USERNAME, password: USER_PASSWORD }),
  });

  if (response.status === 200) {
    const data = (await response.json()) as LoginResponse;
    localStorage.setItem("auth-token", data.access_token || "");
  }
};

const prepareHeaders = (
  headers: Headers,
  api?: Pick<BaseQueryApi, "getState" | "endpoint">
): Headers => {
  const combinedHeaders = new Headers(headers);

  if (api?.endpoint) {
    const accessToken = localStorage.getItem("auth-token");
    if (accessToken) {
      combinedHeaders.set("Authorization", `Bearer ${accessToken}`);
    }
  }
  return combinedHeaders;
};

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, prepareHeaders });

  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401 || result?.error?.status === 403) {
    localStorage.removeItem("auth-token");
    await fetchAccessToken();

    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], void>({
      query: () => `messages/`,
      providesTags: ["Messages"],
    }),
    sendMessage: builder.mutation<Message, MessageForm>({
      query: (payload) => ({
        url: "messages/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Messages"],
    }),
    editMessage: builder.mutation<
      Message,
      Partial<MessageForm> & Pick<Message, "id">
    >({
      query: ({ id, ...payload }) => ({
        url: `messages/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Messages"],
    }),
    deleteMessage: builder.mutation<void, string>({
      query: (id) => ({
        url: `messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useEditMessageMutation,
  useDeleteMessageMutation,
} = apiSlice;
