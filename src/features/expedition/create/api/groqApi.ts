import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface GenerateExpeditionRequestBody {
  name: string;
  countries: string[];
  languages: string[];
  activities: string[];
  groupSize: [number, number];
  tourDuration: [Date, Date];
  meetingDate: Date;
}

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/description-generator',
});

const groqApi = createApi({
  baseQuery,
  reducerPath: 'groqApi',
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

export const { useGenerateDescriptionMutation } = groqApi;

export default groqApi;
