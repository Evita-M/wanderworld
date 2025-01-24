import { CreateExpeditionRequestBody } from '@/app/(backend)/api/expeditions/route';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Expedition } from '../model';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/expeditions',
});

const expeditionApi = createApi({
  baseQuery,
  reducerPath: 'expeditionApi',
  tagTypes: ['Expedition'],
  endpoints: (build) => ({
    getExpedition: build.query<Expedition, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Expedition', id }],
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
          : [{ type: 'Expedition', id: 'LIST' }],
    }),
    createExpedition: build.mutation<Expedition, CreateExpeditionRequestBody>({
      query: (newGuide) => ({
        url: '/',
        method: 'POST',
        body: newGuide,
      }),
      invalidatesTags: [{ type: 'Expedition', id: 'LIST' }],
    }),
    updateExpedition: build.mutation<
      Expedition,
      {
        id: string;
        data: Partial<Omit<Expedition, 'id' | 'createdAt' | 'updatedAt'>>;
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

export const getExpeditionById = async (id: string) => {
  // Implementation here
  return fetch(`/api/expeditions/${id}`).then(res => res.json());
};
