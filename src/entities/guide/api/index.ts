import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import {
  CreateGuideRequestBody,
  Guide,
  UpdateGuideRequestBody,
} from '@/app/(backend)/api/guides/schema';
import { BaseResponse } from '@/utils/error-handler/error-handler';
import { GuideTag } from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/guides',
});

const baseQueryWithRetry = retry(baseQuery, {
  maxRetries: 3,
});

const guideApi = createApi({
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Guide'],
  reducerPath: 'guideApi',
  endpoints: (build) => ({
    getGuide: build.query<Guide, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id): GuideTag[] => [
        { type: 'Guide', id },
      ],
    }),
    getGuides: build.query<Guide[], void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }): GuideTag => ({ type: 'Guide', id })),
              { type: 'Guide', id: 'LIST' },
            ]
          : [{ type: 'Guide', id: 'LIST' }],
    }),
    createGuide: build.mutation<BaseResponse, CreateGuideRequestBody>({
      query: (newGuide) => ({
        url: '/',
        method: 'POST',
        body: newGuide,
      }),
      invalidatesTags: (): GuideTag[] => [{ type: 'Guide', id: 'LIST' }],
    }),
    updateGuide: build.mutation<
      Guide,
      {
        id: string;
        data: UpdateGuideRequestBody;
      }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          guideApi.util.updateQueryData('getGuide', id, (draft) => {
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
    deleteGuide: build.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          guideApi.util.updateQueryData('getGuides', undefined, (draft) => {
            return draft.filter((expedition) => expedition.id !== id);
          })
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
  useGetGuideQuery,
  useGetGuidesQuery,
  useLazyGetGuidesQuery,
  useCreateGuideMutation,
  useDeleteGuideMutation,
  useUpdateGuideMutation,
} = guideApi;

export default guideApi;
