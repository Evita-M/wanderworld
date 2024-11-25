import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ExpeditionSchema } from '@/type/expeditionSchema';
import { Option } from '@/type/option';
import { ExpeditionResponse } from '@/type/apiTypes';

export function useGetCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: () =>
      axios
        .get<Option[]>('http://localhost:8080/countries')
        .then((res) => res.data),
  });
}

export function useGetLanguages() {
  return useQuery({
    queryKey: ['languages'],
    queryFn: () =>
      axios
        .get<Option[]>('http://localhost:8080/languages')
        .then((res) => res.data),
  });
}

export function useGetGenders() {
  return useQuery({
    queryKey: ['genders'],
    queryFn: () =>
      axios
        .get<Option[]>('http://localhost:8080/genders')
        .then((res) => res.data),
  });
}

export function useGetActivities() {
  return useQuery({
    queryKey: ['activities'],
    queryFn: () =>
      axios
        .get<Option[]>('http://localhost:8080/activities')
        .then((res) => res.data),
  });
}

export function useGetExpeditions() {
  return useQuery({
    queryKey: ['users'],
    queryFn: (): Promise<Option[]> =>
      axios
        .get<ExpeditionResponse[]>('http://localhost:8080/expeditions')
        .then((response) =>
          response.data.map((user) => ({
            id: user.id.toString(),
            label: user.name,
          }))
        ),
  });
}

export function useGetExpedition(id: string) {
  return useQuery({
    queryKey: ['expedition', { id }],
    queryFn: async (): Promise<ExpeditionSchema> => {
      const { data } = await axios.get<ExpeditionResponse>(
        `http://localhost:8080/expeditions/${id}`
      );

      return {
        variant: 'edit',
        id: data.id.toString(),
        name: data.name,
        email: data.email,
        guideFirstName: data.guideFirstName,
        guideLastName: data.guideLastName,
        tourDuration: [
          new Date(data.tourDuration[0]),
          new Date(data.tourDuration[1]),
        ],
        gender: data.gender,
        languages: data.languages,
        meetingDateTime: new Date(data.meetingDateTime),
        groupSize: [data.groupSize[0], data.groupSize[1]],
        activities: data.activities,
        countries: data.countries,
        participants: data.participants,
        hasParticipants: data.hasParticipants,
      };
    },
    enabled: !!id,
  });
}
