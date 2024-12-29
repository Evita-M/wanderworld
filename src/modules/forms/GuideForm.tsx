'use client';

import { useForm } from 'react-hook-form';
import { Button, Grid, Stack } from '@mui/material';
import { FC, useEffect } from 'react';
import { guideSchema, GuideSchema, initialValues } from '@/type/guideSchema';
import { Guide } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCreateGuideMutation,
  useUpdateGuideMutation,
} from '@/redux/api/guideApi';
import RHFTextField from '@/components/core/RHFTextField';
import { useSnackbar } from 'hooks/useSnackbar';
import { RHFAutocomplete } from '@/components/core/RHFAutocomplete';
import { languages } from '@/lib/data/languages';

type GuideFormProps = {
  guide?: Guide;
  isEdit?: boolean;
  onSuccess?: VoidFunction;
  onCancel?: VoidFunction;
};

export const GuideForm: FC<GuideFormProps> = ({
  guide,
  isEdit = false,
  onCancel,
  onSuccess,
}) => {
  const [createGuide, { isLoading: isCreateGuideLoading }] =
    useCreateGuideMutation();
  const [
    updateGuide,
    { isLoading: isUpdateGuideLoading, isSuccess: isUpdateGuideSuccess },
  ] = useUpdateGuideMutation();

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
        await updateGuide({ id: guide.id, data: guideData });
        showSnackBar('Your changes were saved!', 'success');
        onSuccess?.();
      } else {
        await createGuide(guideData);
        showSnackBar('New guide was added!', 'success');
      }
      onSuccess?.();
    } catch (error) {
      showSnackBar('Something went wrong', 'warning');
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
          <RHFTextField<GuideSchema>
            label='About'
            errorMessage={errors.description?.message}
            {...register('description')}
          />
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
