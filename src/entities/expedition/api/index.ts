import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { ExpeditionTag } from './types';
import {
  CreateExpeditionRequestBody,
  UpdateExpeditionRequestBody,
  Expedition,
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
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          expeditionApi.util.updateQueryData('getExpedition', id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteExpedition: build.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          expeditionApi.util.updateQueryData(
            'getExpeditions',
            undefined,
            (draft) => {
              return draft.filter((expedition) => expedition.id !== id);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
