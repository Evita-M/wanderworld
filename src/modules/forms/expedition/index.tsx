'use client';

import { useForm, Controller } from 'react-hook-form';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { FC, useEffect, useMemo } from 'react';
import { RHFAutocomplete } from '@/ui/core/input';
import { RHFCheckbox } from '@/ui/core/input';
import { RHFDateTimePicker } from '@/ui/core/input';
import { RHFDateRangePicker } from '@/ui/core/input';
import { RHFSlider } from '@/ui/core/input';

import {
  useCreateExpeditionMutation,
  useUpdateExpeditionMutation,
} from '@/redux/api/expeditionApi';
import { RHFSelect } from '@/ui/core/input';
import { countries } from '@/lib/data/countries';
import { languages } from '@/lib/data/languages';
import { activities } from '@/lib/data/activities';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSnackbar } from 'hooks/useSnackbar';
import { useGetGuidesQuery } from '@/redux/api/guideApi';

import { useGenerateDescriptionMutation } from '@/redux/api/groqApi';
import {
  defaultValues,
  expeditionSchema,
  ExpeditionSchema,
} from './validation';
import { Expedition } from '@/types/expedition';
import { Guide } from '@/types/guide';
import { RichTextEditor } from '@/ui/components/rich-text';
import RHFTextField from '@/ui/core/input/RHFTextField';

interface ExpeditionsFormProps {
  expedition?: Expedition;
  isEdit?: boolean;
  onCancel?: VoidFunction;
  onSuccess?: VoidFunction;
}

export const ExpeditionsForm: FC<ExpeditionsFormProps> = ({
  expedition,
  isEdit = false,
  onCancel,
  onSuccess,
}) => {
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
        guide: expedition.guideId ?? undefined,
      }
    : defaultValues;

  const {
    control,
    reset,
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm<ExpeditionSchema>({
    defaultValues: isEdit && expedition ? expDefaultValues : defaultValues,
    resolver: zodResolver(expeditionSchema),
    mode: 'onChange',
  });

  const formValues = watch();
  useEffect(() => {}, [formValues]);

  // Add useEffect to update form when expedition changes
  useEffect(() => {
    if (expedition && isEdit) {
      reset(expDefaultValues);
    }
  }, [expedition, isEdit]); // eslint-disable-line react-hooks/exhaustive-deps

  const { showSnackBar } = useSnackbar();

  // Memoize guides dropdown options
  const guidesOptions = useMemo(() => {
    return guides?.map((guide: Guide) => ({
      id: guide.id,
      label: `${guide.firstName} ${guide.lastName}`,
    }));
  }, [guides]);

  const [generateDescription, { isLoading: isGeneratingDescriptionLoading }] =
    useGenerateDescriptionMutation();

  const handleOnGenerateDescription = async () => {
    try {
      const formData = {
        name: watch('name'),
        countries: watch('countries'),
        languages: watch('languages'),
        activities: watch('activities'),
        groupSize: watch('groupSize') as [number, number],
        tourDuration: watch('tourDuration') as [Date, Date],
        meetingDate: watch('meetingDate'),
        guide: watch('guide'),
      };

      const { data } = await generateDescription(formData);
      if (data?.description) {
        setValue('description', data.description, {
          shouldValidate: true,
        });
      }
    } catch (error) {
      showSnackBar('Failed to generate description', 'error');
    }
  };

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
      guide: isEdit
        ? data.guide
          ? { connect: { id: data.guide } }
          : { disconnect: true }
        : data.guide
          ? { connect: { id: data.guide } }
          : undefined,
    };
    console.log(expeditionData);
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
      onSuccess?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      showSnackBar(errorMessage, 'warning');
    }
  }

  return (
    <Stack component='form' onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} rowSpacing={5}>
        <Grid item xs={6}>
          <RHFTextField<ExpeditionSchema>
            label='Name'
            errorMessage={errors.name?.message}
            {...register('name')}
          />
        </Grid>
        <Grid item xs={6}>
          <RHFSelect<ExpeditionSchema>
            label='Guide'
            options={guidesOptions || []}
            control={control}
            errorMessage={errors.guide?.message}
            {...register('guide')}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFAutocomplete<ExpeditionSchema>
            label='Countries'
            options={countries}
            control={control}
            errorMessage={errors.countries?.message}
            {...register('countries')}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFDateRangePicker<ExpeditionSchema>
            label='Expedition duration'
            control={control}
            {...register('tourDuration')}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFAutocomplete<ExpeditionSchema>
            label='Languages'
            options={languages}
            control={control}
            errorMessage={errors.languages?.message}
            {...register('languages')}
          />
        </Grid>
        <Grid item xs={6}>
          <RHFSlider<ExpeditionSchema>
            label='Group size'
            limit={[0, 40]}
            control={control}
            errorMessage={errors.groupSize?.message}
            {...register('groupSize')}
          />
        </Grid>
        <Grid item xs={6}>
          <RHFDateTimePicker<ExpeditionSchema>
            label='First meeting'
            control={control}
            {...register('meetingDate')}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFCheckbox<ExpeditionSchema>
            label='Activities'
            options={activities}
            control={control}
            errorMessage={errors.activities?.message}
            {...register('activities')}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <Stack width='100%'>
                  <Typography variant='caption' mb={2}>
                    Description
                  </Typography>
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    initialContent={expedition?.description || ''}
                    onGenerateDescription={handleOnGenerateDescription}
                    isGenerating={isGeneratingDescriptionLoading}
                    isGenerationEnabled={isValid}
                  />
                </Stack>
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack
            maxWidth='50rem'
            m='0 auto'
            spacing={3}
            direction='row'
            justifyContent='center'
          >
            <Button
              type='button'
              onClick={onCancel}
              variant='outlined'
              color='secondary'
              fullWidth
            >
              Cancel
            </Button>
            <Button
              fullWidth
              type='submit'
              variant='contained'
              disabled={
                !isValid ||
                isCreateExpeditionLoading ||
                isUpdateExeditionLoading
              }
            >
              {isEdit ? 'Save changes' : 'Create expedition'}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
