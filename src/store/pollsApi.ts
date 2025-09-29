import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewPoll, Poll , PollByIdResponse } from "@/types";




export const pollsApi = createApi({
  reducerPath: "pollsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/polls" }),
  tagTypes: ["Polls"],
  endpoints: (builder) => ({
    getPolls: builder.query<{ polls: Poll[] }, void>({
      query: () => "/",
      providesTags: ["Polls"],
    }),
    getPollById: builder.query<PollByIdResponse, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Polls', id }],
    }),
    createPoll: builder.mutation<Poll, NewPoll>({
      query: (newPoll) => ({
        url: "/",
        method: "POST",
        body: newPoll,
      }),
      invalidatesTags: ["Polls"],
    }),
    updatePollStatus: builder.mutation<Poll, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: "/",
        method: "PUT",
        body: { pollId: id, status },
      }),
      invalidatesTags: ["Polls"],
    }),
    deletePoll: builder.mutation<void, string>({
      query: (id) => ({
        url: `/?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Polls"],
    }),
  }),
});

export const {
  useGetPollsQuery,
  useGetPollByIdQuery,
  useCreatePollMutation,
  useUpdatePollStatusMutation,
  useDeletePollMutation,
} = pollsApi;