import { Button, Grid, Stack, Typography } from '@mui/material';
import {
  RHFAutocomplete,
  RHFCheckbox,
  RHFDateRangePicker,
  RHFDateTimePicker,
  RHFSelect,
  RHFSlider,
  RHFTextField,
} from '../../core/input';

import {
  defaultValues,
  ExpeditionFormSchema,
  expeditionFormSchema,
} from './validation';
import { languages } from '@/lib/data/languages';
import { countries } from '@/lib/data/countries';
import { FC, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { activities } from '@/lib/data/activities';
import { useSnackbar } from '@/lib/hooks/use-snackbar';
import { useGenerateDescriptionMutation } from '@/lib/api/groq-api';
import { RichTextEditor } from '@/shared/ui/components/rich-text/editor';
import { Guide } from '@/shared/types/guide';

interface ExpeditionFormProps {
  onSubmit: (data: ExpeditionFormSchema) => Promise<void>;
  isSubmitting?: boolean;
  onCancel: VoidFunction;
  guides: any;
  buttonLabels: {
    cancel: string;
    submit: string;
  };
  expedition?: ExpeditionFormSchema;
}

export const ExpeditionForm: FC<ExpeditionFormProps> = ({
  onSubmit,
  isSubmitting,
  guides,
  onCancel,
  expedition,
  buttonLabels,
}) => {
  const { showSnackBar } = useSnackbar();

  const expDefaultValues = expedition ? expedition : defaultValues;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm<ExpeditionFormSchema>({
    defaultValues: expDefaultValues,
    resolver: zodResolver(expeditionFormSchema),
    mode: 'onChange',
  });

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
        countries: watch('countries').map((country) => country.code),
        languages: watch('languages').map((language) => language.code),
        activities: watch('activities'),
        groupSize: watch('groupSize') as [number, number],
        tourDuration: watch('tourDuration') as [Date, Date],
        meetingDate: watch('meetingDate'),
        guideId: watch('guideId'),
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

  return (
    <Stack component='form' onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} rowSpacing={5}>
        <Grid item xs={6}>
          <RHFTextField
            name='name'
            control={control}
            label='Name'
            errorMessage={errors.name?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <RHFSelect
            name='guideId'
            label='Guide'
            options={guidesOptions || []}
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFAutocomplete
            name='countries'
            label='Countries'
            options={countries}
            control={control}
            errorMessage={errors.countries?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFDateRangePicker
            name='tourDuration'
            label='Expedition duration'
            control={control}
            errorMessage={errors.tourDuration?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFAutocomplete
            name='languages'
            label='Languages'
            options={languages}
            control={control}
            errorMessage={errors.languages?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <RHFSlider
            name='groupSize'
            label='Group size'
            limit={[1, 40]}
            control={control}
            errorMessage={errors.groupSize?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <RHFDateTimePicker
            name='meetingDate'
            label='First meeting'
            control={control}
            errorMessage={errors.meetingDate?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFCheckbox
            name='activities'
            label='Activities'
            options={activities}
            control={control}
            errorMessage={errors.activities?.message}
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
            {' '}
            <Button
              type='button'
              onClick={onCancel}
              variant='outlined'
              color='secondary'
              fullWidth
            >
              {buttonLabels.cancel}
            </Button>
            <Button
              fullWidth
              type='submit'
              variant='contained'
              disabled={!isValid || isSubmitting}
            >
              {buttonLabels.submit}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
