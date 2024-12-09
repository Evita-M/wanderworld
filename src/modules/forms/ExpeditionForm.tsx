'use client';

import { useForm } from 'react-hook-form';
import { Button, Container, Stack } from '@mui/material';
import { FC, useEffect, useMemo } from 'react';
import { RHFAutocomplete } from '@/components/core/RHFAutocomplete';
import { RHFCheckbox } from '@/components/core/RHFCheckbox';
import { RHFDateTimePicker } from '@/components/core/RHFDateTimePicker';
import { RHFDateRangePicker } from '@/components/core/RHFDateRangePicker';
import { RHFSlider } from '@/components/core/RHFSlider';
import {
  ExpeditionSchema,
  defaultValues,
  expeditionSchema,
} from '@/type/expeditionSchema';

import RHFTextField from '@/components/core/RHFTextField';
import {
  useCreateExpeditionMutation,
  useUpdateExpeditionMutation,
} from '@/redux/api/expeditionApi';
import { RHFSelect } from '@/components/core/RHFSelect';
import { countries } from '@/lib/data/countries';
import { languages } from '@/lib/data/languages';
import { activities } from '@/lib/data/activities';
import { zodResolver } from '@hookform/resolvers/zod';
import { Expedition, Guide } from '@prisma/client';
import { useSnackbar } from 'hooks/useSnackbar';
import { useGetGuidesQuery } from '@/redux/api/guideApi';
import { routes } from '@/routes/index';
import { useRouter } from 'next/navigation';

type ExpeditionFormProps = {
  onClose?: VoidFunction;
  expedition?: Expedition;
  isEdit?: boolean;
  setIsEdit?: any;
};

export const ExpeditionsForm: FC<ExpeditionFormProps> = ({
  expedition,
  onClose,
  isEdit = false,
  setIsEdit,
}) => {
  const router = useRouter();
  const [
    createExpedition,
    {
      isLoading: isCreateExpeditionLoading,
      isSuccess: isCreateExpeditionSuccess,
    },
  ] = useCreateExpeditionMutation();

  const [
    updateExedition,
    {
      isLoading: isUpdateExeditionLoading,
      isSuccess: isUpdateExeditionSuccess,
    },
  ] = useUpdateExpeditionMutation();

  const { data: guides } = useGetGuidesQuery();

  const expDefaultValues = expedition
    ? {
        ...defaultValues,
        name: expedition.name,
        description: expedition.description || '',
        countries: expedition.countries,
        languages: expedition.languages,
        activities: expedition.activities,
        meetingDateTime: new Date(expedition.meetingDate),
        tourDuration: [
          new Date(expedition.startDate),
          new Date(expedition.endDate),
        ],
        groupSize: [expedition.minGroupSize, expedition.maxGroupSize],
        guide: expedition.guideId ?? '',
      }
    : defaultValues;

  const {
    watch,
    control,
    unregister,
    reset,
    setValue,
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<ExpeditionSchema>({
    defaultValues: isEdit && expedition ? expDefaultValues : defaultValues,
    resolver: zodResolver(expeditionSchema),
  });

  const { showSnackBar } = useSnackbar();

  useEffect(() => {
    if (isCreateExpeditionSuccess) {
      reset();
    }
    if (isUpdateExeditionSuccess) {
      setIsEdit(false);
    }
  }, [
    reset,
    isCreateExpeditionSuccess,
    isUpdateExeditionSuccess,
    setIsEdit,
    expedition,
  ]);

  // Memoize guides dropdown options
  const guidesOptions = useMemo(() => {
    return guides?.map((guide: Guide) => ({
      id: guide.id,
      label: `${guide.firstName} ${guide.lastName}`,
    }));
  }, [guides]);

  // Submit handler
  async function onSubmit(data: ExpeditionSchema) {
    const expeditionData = {
      name: data.name,
      description: data.description,
      activities: data.activities,
      countries: data.countries,
      languages: data.languages || [],
      meetingDate: new Date(data.meetingDate),
      minGroupSize: data.groupSize[0],
      maxGroupSize: data.groupSize[1],
      startDate: new Date(data.tourDuration[0]) ?? undefined,
      endDate: new Date(data.tourDuration[1]) ?? undefined,
      guide: data.guide ? { connect: { id: data.guide } } : undefined,
    };

    try {
      if (isEdit && expedition) {
        await updateExedition({
          id: expedition.id,
          data: expeditionData,
        });
        showSnackBar('Expedition updated successfully!', 'success');
      } else {
        await createExpedition(expeditionData);
        showSnackBar('New expedition created successfully!', 'success');
      }
      onClose?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      showSnackBar(errorMessage, 'warning');
    }
  }

  return (
    <Stack
      maxWidth='lg'
      m='0 auto'
      direction='row'
      component='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Container>
        <Stack sx={{ gap: 4 }} mb='24px'>
          <RHFTextField<ExpeditionSchema>
            label='Expedtition name'
            {...register('name')}
          />
          <RHFTextField<ExpeditionSchema>
            label='Description'
            {...register('description')}
          />
          <RHFAutocomplete<ExpeditionSchema>
            label='Countries'
            options={countries}
            control={control}
            {...register('countries')}
          />
          <RHFAutocomplete<ExpeditionSchema>
            label='Languages'
            options={languages}
            control={control}
            {...register('languages')}
          />
          <RHFCheckbox<ExpeditionSchema>
            label='Activities'
            options={activities}
            control={control}
            {...register('activities')}
          />
          <RHFDateTimePicker<ExpeditionSchema>
            label='First expedition meeting'
            control={control}
            {...register('meetingDate')}
          />
          <RHFDateRangePicker<ExpeditionSchema>
            label='Expedition duration'
            control={control}
            {...register('tourDuration')}
          />
          <RHFSlider<ExpeditionSchema>
            label='Group size'
            limit={[0, 40]}
            control={control}
            {...register('groupSize')}
          />
          <RHFSelect<ExpeditionSchema>
            label='Guide'
            options={guidesOptions || []}
            control={control}
            {...register('guide')}
          />
        </Stack>
        <Stack
          marginTop='32px'
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type='button'
            onClick={() => null}
            variant='outlined'
            color='secondary'
          >
            Cancel
          </Button>
          <Button
            type='submit'
            variant='contained'
            disabled={
              !isValid || isCreateExpeditionLoading || isUpdateExeditionLoading
            }
          >
            {expedition ? 'Edit expedition' : 'Add expedition'}
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
};
