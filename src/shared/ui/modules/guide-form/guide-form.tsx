import { Button, Grid, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RHFTextField, RHFAutocomplete } from '../../core/input';
import { RichTextEditor } from '../../components/rich-text';
import { languages } from '@/lib/data/languages';
import { defaultValues, guideFormSchema, GuideFormSchema } from './validation';

interface GuideFormProps {
  onSubmit: (data: GuideFormSchema) => Promise<void>;
  isSubmitting?: boolean;
  onCancel: VoidFunction;
  buttonLabels: {
    cancel: string;
    submit: string;
  };
  guide?: GuideFormSchema;
}

export const GuideForm: FC<GuideFormProps> = ({
  onSubmit,
  isSubmitting,
  onCancel,
  guide,
  buttonLabels,
}) => {
  const guideDefaultValues = guide ? guide : defaultValues;

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    getValues,
  } = useForm<GuideFormSchema>({
    defaultValues: guideDefaultValues,
    resolver: zodResolver(guideFormSchema),
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} rowSpacing={5}>
        <Grid item xs={6}>
          <RHFTextField
            label='First Name'
            errorMessage={errors.firstName?.message}
            control={control}
            name='firstName'
          />
        </Grid>
        <Grid item xs={6}>
          <RHFTextField
            label='Last Name'
            name='lastName'
            errorMessage={errors.lastName?.message}
            control={control}
          />
        </Grid>
        <Grid item xs={6}>
          <RHFTextField
            name='email'
            label='Email'
            control={control}
            errorMessage={errors.email?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <RHFTextField
            name='phoneNumber'
            label='Phone Number'
            control={control}
            errorMessage={errors.phoneNumber?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFAutocomplete
            label='Languages'
            options={languages}
            control={control}
            name='languages'
            errorMessage={errors.languages?.message}
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
                    About
                  </Typography>
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    initialContent={guide?.description || ''}
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
    </form>
  );
};
