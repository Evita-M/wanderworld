'use client';

import { FC } from 'react';
import { useCreateExpeditionMutation } from '@/entities/expedition/api';
import { useSnackbar } from '@/lib/hooks/useSnackbar';
import { useGetGuidesQuery } from '@/entities/guide/api';
import {
  ExpeditionForm,
  ExpeditionSchema,
} from '@/shared/ui/modules/expedition-form';
import { routes } from '@/lib/config/routes';
import { useRouter } from 'next/navigation';

export const CreateExpedition: FC = () => {
  const router = useRouter();
  const { showSnackBar } = useSnackbar();
  const [createExpedition, { isLoading: isCreateExpeditionLoading }] =
    useCreateExpeditionMutation();

  const { data: guides } = useGetGuidesQuery();

  async function handleOnSubmit(data: ExpeditionSchema) {
    const expeditionData = {
      name: data.name,
      description: data.description,
      activities: data.activities,
      countries: data.countries.map((country) => ({
        code: country.id,
        name: country.label,
      })),
      languages: data.languages.map((language) => ({
        code: language.id,
        name: language.label,
      })),
      meetingDate: new Date(data.meetingDate),
      minGroupSize: data.groupSize[0],
      maxGroupSize: data.groupSize[1],
      startDate: new Date(data.tourDuration[0]) ?? undefined,
      endDate: new Date(data.tourDuration[1]) ?? undefined,
      guide: data.guide ? { connect: { id: data.guide } } : undefined,
    };
    try {
      await createExpedition(expeditionData);
      showSnackBar('New expedition created successfully!', 'success');
      router.push(`${routes.expeditions}`);
    } catch (error) {
      showSnackBar(
        (error as Error).message || 'Failed to create expedition',
        'warning'
      );
    }
  }

  return (
    <ExpeditionForm
      onSubmit={handleOnSubmit}
      onCancel={() => router.push(routes.expeditions)}
      guides={guides}
      isSubmitting={isCreateExpeditionLoading}
      buttonLabels={{ cancel: 'Cancel', submit: 'Create expedition' }}
    />
  );
};
