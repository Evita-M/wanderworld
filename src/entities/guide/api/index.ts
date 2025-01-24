
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Guide } from '../model';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/guides',
});

const guideApi = createApi({
  baseQuery,
  tagTypes: ['Guide'],
  reducerPath: 'guideApi',
  endpoints: (build) => ({
    getGuide: build.query<Guide, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Guide', id }],
    }),
    getGuides: build.query<Guide[], void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Guide' as const, id })),
              { type: 'Guide' as const, id: 'LIST' },
            ]
          : [{ type: 'Guide', id: 'LIST' }],
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
