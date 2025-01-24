import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GenerateExpeditionRequestBody } from '../model';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/description-generator',
});

export const expeditionCreateApi = createApi({
  baseQuery,
  reducerPath: 'expeditionCreateApi',
  tagTypes: ['ExpeditionDescription'],
  endpoints: (build) => ({
    generateDescription: build.mutation<
      { description: string },
      GenerateExpeditionRequestBody
    >({
      query: (requestBody) => ({
        url: '/',
        method: 'POST',
        body: requestBody,
      }),
    }),
  }),
});



export const { useGenerateDescriptionMutation } = expeditionCreateApi;
