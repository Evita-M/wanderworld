'use client';
import { FC } from 'react';
import { useUpdateExpeditionMutation } from '@/entities/expedition/api';
import { useSnackbar } from '@/lib/hooks/useSnackbar';
import { useGetGuidesQuery } from '@/entities/guide/api';
import {
  ExpeditionForm,
  ExpeditionFormSchema,
} from '@/shared/ui/modules/expedition-form';
import { useParams, useRouter } from 'next/navigation';
import { useGetExpeditionQuery } from '@/entities/expedition/api';
import { routes } from '@/lib/config/routes';
import { ExpeditionFormSkeleton } from '@/shared/ui/modules/skeleton';
import { UpdateExpeditionRequestBody } from '@/app/(backend)/api/expeditions/schema';

export const EditExpedition: FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: expedition, isLoading: isGetExpeditionLoading } =
    useGetExpeditionQuery(id as string);
  console.log({ expedition });
  const [updateExedition, { isLoading: isUpdateExeditionLoading }] =
    useUpdateExpeditionMutation();

  const { data: guides } = useGetGuidesQuery();
  const { showSnackBar } = useSnackbar();

  const redirectToExpedition = () => {
    router.push(`${routes.expeditions}/${id}`);
  };

  // Submit handler
  async function handleOnSubmit(data: ExpeditionFormSchema) {
    const expeditionData: UpdateExpeditionRequestBody = {
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
    console.log(expeditionData);

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

  const remapedExpedition: ExpeditionFormSchema | undefined = expedition
    ? {
        ...expedition,
        description: expedition?.description ?? undefined,
        groupSize: [expedition.minGroupSize, expedition.maxGroupSize],
        meetingDate: new Date(expedition.meetingDate),
        tourDuration: [
          new Date(expedition.startDate),
          new Date(expedition.endDate),
        ],
        guideId: expedition.guide?.id,
      }
    : undefined;

  return (
    <>
      {isGetExpeditionLoading ? (
        <ExpeditionFormSkeleton />
      ) : (
        <ExpeditionForm
          onSubmit={handleOnSubmit}
          isSubmitting={isUpdateExeditionLoading}
          onCancel={redirectToExpedition}
          expedition={remapedExpedition}
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
