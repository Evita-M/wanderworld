import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mapExpedition } from '../utils/mapExpedition';
import { omit } from 'lodash';
import { ExpeditionSchema } from '@/type/expeditionSchema';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ExpeditionSchema) => {
      await axios.post(
        'http://localhost:8080/expeditions',
        omit(mapExpedition(data), 'variant')
      );
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['expeditions'] });
      alert('New expedition created!');
    },
  });
}

export function useEditUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ExpeditionSchema) => {
      if (data.variant === 'edit') {
        await axios.put(
          `http://localhost:8080/expeditions/${data.id}`,
          omit(mapExpedition(data), 'variant')
        );
        alert('Expedition edited successfully!');
      }
    },

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['expeditions'] });

      if (variables.variant === 'edit') {
        await queryClient.invalidateQueries({
          queryKey: ['expedition', { id: variables.id }],
        });
      }
    },
  });
}
