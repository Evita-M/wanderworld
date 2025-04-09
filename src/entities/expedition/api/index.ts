import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { ExpeditionTag } from './types';
import {
  CreateExpeditionRequestBody,
  UpdateExpeditionRequestBody,
  GetExpeditionPayload,
} from '@/app/(backend)/api/expeditions/schema';
import { BaseResponse } from '@/utils/error-handler/error-handler';

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
    getExpedition: build.query<GetExpeditionPayload, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id): ExpeditionTag[] => [
        { type: 'Expedition', id },
      ],
    }),
    getExpeditions: build.query<GetExpeditionPayload[], void>({
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
    createExpedition: build.mutation<BaseResponse, CreateExpeditionRequestBody>(
      {
        query: (newExpedition) => ({
          url: '/',
          method: 'POST',
          body: newExpedition,
        }),
        invalidatesTags: (): ExpeditionTag[] => [
          { type: 'Expedition', id: 'LIST' },
        ],
      }
    ),
    updateExpedition: build.mutation<
      BaseResponse,
      {
        id: string;
        data: UpdateExpeditionRequestBody;
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
    deleteExpedition: build.mutation<BaseResponse, string>({
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
