import { CreateExpeditionRequestBody } from '@/app/(backend)/api/expeditions/route';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { Expedition } from '../model';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/expeditions',
});

const baseQueryWithRetry = retry(baseQuery, {
  maxRetries: 3,
});

export const expeditionApi = createApi({
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Expedition'],
  reducerPath: 'expeditionApi',
  endpoints: (build) => ({
    getExpedition: build.query<Expedition, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [
        { type: 'Expedition' as const, id },
      ],
    }),
    getExpeditions: build.query<Expedition[], void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Expedition' as const, id })),
              { type: 'Expedition' as const, id: 'LIST' },
            ]
          : [{ type: 'Expedition' as const, id: 'LIST' }],
    }),
    createExpedition: build.mutation<Expedition, CreateExpeditionRequestBody>({
      query: (newExpedition) => ({
        url: '/',
        method: 'POST',
        body: newExpedition,
      }),
      invalidatesTags: [{ type: 'Expedition', id: 'LIST' }],
    }),
    updateExpedition: build.mutation<
      Expedition,
      {
        id: string;
        data: Expedition;
      }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Expedition', id },
        { type: 'Expedition', id: 'LIST' },
      ],
    }),
    deleteExpedition: build.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'Expedition', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetExpeditionQuery,
  useGetExpeditionsQuery,
  useCreateExpeditionMutation,
  useDeleteExpeditionMutation,
  useUpdateExpeditionMutation,
} = expeditionApi;

export default expeditionApi;
