import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { Guide } from '../model';
import { Expedition } from '@/entities/expedition/model';


const baseQuery = fetchBaseQuery({
  baseUrl: '/api/guides',
});

const baseQueryWithRetry = retry(baseQuery, {
  maxRetries: 3
});


const guideApi = createApi({
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Guide'],
  reducerPath: 'guideApi',
  endpoints: (build) => ({
    getGuide: build.query<Guide & { expeditions: Expedition[] }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Guide' as const, id }],
    }),
    getGuides: build.query<Guide[], void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((guide) => ({ type: 'Guide' as const, id: guide.id })),
              { type: 'Guide' as const, id: 'LIST' }
            ]
          : [{ type: 'Guide' as const, id: 'LIST' }],
    }),
    createGuide: build.mutation<Guide, Partial<Guide>>({
      query: (newGuide) => ({
        url: '/',
        method: 'POST',
        body: newGuide,
      }),
      invalidatesTags: [{ type: 'Guide', id: 'LIST' }],
    }),
    updateGuide: build.mutation<
      Guide,
      {
        id: string;
        data: Partial<Omit<Guide, 'id' | 'createdAt' | 'updatedAt'>>;
      }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Guide', id },
        { type: 'Guide', id: 'LIST' },
      ],
    }),
    deleteGuide: build.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'Guide', id: 'LIST' }],
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
