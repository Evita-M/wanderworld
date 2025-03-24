import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

import {
  ExpeditionTag,
  CreateExpeditionDTO,
  UpdateExpeditionDTO,
} from './types';
import { Expedition } from '@prisma/client';

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
      providesTags: (_result, _error, id): ExpeditionTag[] => [
        { type: 'Expedition', id },
      ],
    }),
    getExpeditions: build.query<Expedition[], void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: (result): ExpeditionTag[] =>
        result
          ? [
              ...result.map(
                ({ id }): ExpeditionTag => ({ type: 'Expedition', id })
              ),
              { type: 'Expedition', id: 'LIST' },
            ]
          : [{ type: 'Expedition', id: 'LIST' }],
    }),
    createExpedition: build.mutation<Expedition, CreateExpeditionDTO>({
      query: (newExpedition) => ({
        url: '/',
        method: 'POST',
        body: newExpedition,
      }),
      invalidatesTags: (): ExpeditionTag[] => [
        { type: 'Expedition', id: 'LIST' },
      ],
    }),
    updateExpedition: build.mutation<
      Expedition,
      {
        id: string;
        data: UpdateExpeditionDTO;
      }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }): ExpeditionTag[] => [
        { type: 'Expedition', id },
        { type: 'Expedition', id: 'LIST' },
      ],
    }),
    deleteExpedition: build.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (): ExpeditionTag[] => [
        { type: 'Expedition', id: 'LIST' },
      ],
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
