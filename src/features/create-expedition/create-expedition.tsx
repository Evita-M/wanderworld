'use client';

import { FC } from 'react';
import { useCreateExpeditionMutation } from '@/entities/expedition/api';
import { useSnackbar } from '@/lib/hooks/use-snackbar';
import { useGetGuidesQuery } from '@/entities/guide/api';
import { ExpeditionForm } from '@/shared/ui/modules/expedition-form/expedition-form';
import { routes } from '@/lib/config/routes';
import { useRouter } from 'next/navigation';
import { ExpeditionFormSchema } from '@/shared/ui/modules/expedition-form/validation';
import { CreateExpeditionRequestBody } from '@/app/(backend)/api/expeditions/schema';

export const CreateExpedition: FC = () => {
  const router = useRouter();
  const { showSnackBar } = useSnackbar();
  const [createExpedition, { isLoading: isCreateExpeditionLoading }] =
    useCreateExpeditionMutation();

  const { data: guides } = useGetGuidesQuery();

  async function handleOnSubmit(data: ExpeditionFormSchema) {
    const expeditionData: CreateExpeditionRequestBody = {
      name: data.name,
      description: data.description,
      activities: data.activities,
      countries: data.countries,
      languages: data.languages,
      meetingDate: new Date(data.meetingDate),
      minGroupSize: data.groupSize[0],
      maxGroupSize: data.groupSize[1],
      startDate: new Date(data.tourDuration[0]) ?? undefined,
      endDate: new Date(data.tourDuration[1]) ?? undefined,
      guideId: data.guideId,
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
