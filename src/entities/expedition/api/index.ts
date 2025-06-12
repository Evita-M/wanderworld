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
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        // Optimistically update the single expedition
        const patchExpedition = dispatch(
          expeditionApi.util.updateQueryData('getExpedition', id, (draft) => {
            Object.assign(draft, data);
          })
        );
        // Optimistically update the expedition list
        const patchList = dispatch(
          expeditionApi.util.updateQueryData(
            'getExpeditions',
            undefined,
            (draft) => {
              const index = draft.findIndex((e) => e.id === id);
              if (index !== -1) Object.assign(draft[index], data);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchExpedition.undo();
          patchList.undo();
        }
      },
      invalidatesTags: (): ExpeditionTag[] => [
        { type: 'Expedition', id: 'LIST' },
      ],
    }),
    deleteExpedition: build.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          expeditionApi.util.updateQueryData(
            'getExpeditions',
            undefined,
            (draft) => {
              return draft.filter((expedition) => expedition.id !== id);
            }
          )
        );
        const patchSingle = dispatch(
          expeditionApi.util.updateQueryData(
            'getExpedition',
            id,
            () => undefined
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchList.undo();
          patchSingle.undo();
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
