'use client';
import { FC } from 'react';
import { useUpdateExpeditionMutation } from '@/entities/expedition/api';
import { useSnackbar } from '@/lib/hooks/useSnackbar';
import { useGetGuidesQuery } from '@/entities/guide/api';
import {
  ExpeditionForm,
  ExpeditionSchema,
} from '@/shared/ui/modules/expedition-form';
import { useParams, useRouter } from 'next/navigation';
import { useGetExpeditionQuery } from '@/entities/expedition/api';
import { routes } from '@/lib/config/routes';
import { ExpeditionFormSkeleton } from '@/shared/ui/modules/skeleton';

export const EditExpedition: FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: expedition, isLoading: isGetExpeditionLoading } =
    useGetExpeditionQuery(id as string);

  const [updateExedition, { isLoading: isUpdateExeditionLoading }] =
    useUpdateExpeditionMutation();

  const { data: guides } = useGetGuidesQuery();
  const { showSnackBar } = useSnackbar();

  const redirectToExpedition = () => {
    router.push(`${routes.expeditions}/${id}`);
  };

  // Submit handler
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
      guide: data.guide
        ? { connect: { id: data.guide } }
        : { disconnect: true },
    };

    try {
      if (expedition) {
        await updateExedition({
          id: expedition.id,
          data: expeditionData,
        });
        showSnackBar('Expedition updated successfully!', 'success');
        redirectToExpedition();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      showSnackBar(errorMessage, 'warning');
    }
  }

  return (
    <>
      {isGetExpeditionLoading ? (
        <ExpeditionFormSkeleton />
      ) : (
        <ExpeditionForm
          onSubmit={handleOnSubmit}
          isSubmitting={isUpdateExeditionLoading}
          onCancel={redirectToExpedition}
          expedition={expedition}
          guides={guides}
          buttonLabels={{
            cancel: 'Cancel',
            submit: 'Edit expedition',
          }}
        />
      )}
    </>
  );
};
