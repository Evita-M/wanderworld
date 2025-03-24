import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import {
  ExpeditionTag,
  CreateExpeditionDTO,
  UpdateExpeditionDTO,
} from './types';
import { expeditionSchema, ExpeditionSchema } from './schema';
import { Expedition as PrismaExpedition } from '@prisma/client';

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
    getExpedition: build.query<ExpeditionSchema, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id): ExpeditionTag[] => [
        { type: 'Expedition', id },
      ],
      transformResponse: (response: PrismaExpedition) => {
        return expeditionSchema.parse(response);
      },
    }),
    getExpeditions: build.query<ExpeditionSchema[], void>({
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
      transformResponse: (response: PrismaExpedition[]) => {
        return response.map((expedition) => expeditionSchema.parse(expedition));
      },
    }),
    createExpedition: build.mutation<ExpeditionSchema, CreateExpeditionDTO>({
      query: (newExpedition) => ({
        url: '/',
        method: 'POST',
        body: newExpedition,
      }),
      invalidatesTags: (): ExpeditionTag[] => [
        { type: 'Expedition', id: 'LIST' },
      ],
      transformResponse: (response: PrismaExpedition) => {
        return expeditionSchema.parse(response);
      },
    }),
    updateExpedition: build.mutation<
      ExpeditionSchema,
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
      transformResponse: (response: PrismaExpedition) => {
        return expeditionSchema.parse(response);
      },
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
