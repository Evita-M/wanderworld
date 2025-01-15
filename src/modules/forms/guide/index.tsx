'use client';

import { Controller, useForm } from 'react-hook-form';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { guideSchema, GuideSchema, initialValues } from './validation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCreateGuideMutation,
  useUpdateGuideMutation,
} from '@/redux/api/guideApi';
import { useSnackbar } from 'hooks/useSnackbar';
import { RHFAutocomplete } from '@/ui/core/input';
import { languages } from '@/lib/data/languages';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Guide } from '@/types/guide';
import { RichTextEditor } from '@/ui/components/rich-text';
import RHFTextField from '@/ui/core/input/RHFTextField';

type GuideFormProps = {
  guide?: Guide;
  isEdit?: boolean;
  onSuccess?: (guideId: string) => void;
  onCancel?: VoidFunction;
};

export const GuideForm: FC<GuideFormProps> = ({
  guide,
  isEdit,
  onCancel,
  onSuccess,
}) => {
  const [createGuide, { isLoading: isCreateGuideLoading }] =
    useCreateGuideMutation();
  const [updateGuide, { isLoading: isUpdateGuideLoading }] =
    useUpdateGuideMutation();

  const { showSnackBar } = useSnackbar();

  const guideDefaultValues = {
    firstName: guide?.firstName ?? '',
    lastName: guide?.lastName ?? '',
    phoneNumber: guide?.phoneNumber ?? '',
    description: guide?.description ?? '',
    avatar: guide?.avatar ?? '',
    email: guide?.email ?? '',
    languages: guide?.languages ?? [],
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    control,
    reset,
    watch,
  } = useForm<GuideSchema>({
    defaultValues: isEdit && guide ? guideDefaultValues : initialValues,
    resolver: zodResolver(guideSchema),
    mode: 'onChange',
  });

  async function onSubmit(data: GuideSchema) {
    const guideData: Partial<Guide> = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      description: data.description || null,
      avatar: data.avatar,
      languages: data.languages,
    };

    try {
      if (guide && isEdit) {
        const result = await updateGuide({
          id: guide.id,
          data: guideData,
        }).unwrap();
        showSnackBar('Your changes were saved!', 'success');
        onSuccess?.(result.id);
      } else {
        const result = await createGuide(guideData).unwrap();
        showSnackBar('New guide was added!', 'success');
        onSuccess?.(result.id);
      }
    } catch (error) {
      const err = error as FetchBaseQueryError;
      const message =
        (err.data as { message: string })?.message || 'Something went wrong';
      showSnackBar(message, 'error');
    }
  }

  useEffect(() => {
    if (guide && isEdit) {
      reset(guideDefaultValues);
    }
  }, [guide, isEdit]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} rowSpacing={5}>
        <Grid item xs={6}>
          <RHFTextField<GuideSchema>
            label='First Name'
            errorMessage={errors.firstName?.message}
            {...register('firstName')}
          />
        </Grid>
        <Grid item xs={6}>
          <RHFTextField<GuideSchema>
            label='Last Name'
            errorMessage={errors.lastName?.message}
            {...register('lastName')}
          />
        </Grid>
        <Grid item xs={6}>
          <RHFTextField<GuideSchema>
            label='Email'
            error={!!errors.email}
            errorMessage={errors.email?.message}
            {...register('email')}
          />
        </Grid>
        <Grid item xs={6}>
          <RHFTextField<GuideSchema>
            label='Phone Number'
            error={!!errors.phoneNumber}
            errorMessage={errors.phoneNumber?.message}
            {...register('phoneNumber')}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFAutocomplete<GuideSchema>
            label='Languages'
            options={languages}
            control={control}
            {...register('languages')}
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
              Cancel
            </Button>
            <Button
              fullWidth
              type='submit'
              variant='contained'
              disabled={
                !isValid || isCreateGuideLoading || isUpdateGuideLoading
              }
            >
              {isEdit ? 'Save changes' : 'Create guide'}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};
