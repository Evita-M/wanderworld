'use client';

import { useForm } from 'react-hook-form';
import { Button, CircularProgress, Stack } from '@mui/material';
import { FC } from 'react';
import { guideSchema, GuideSchema, initialValues } from '@/type/guideSchema';
import { Guide } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateGuideMutation } from '@/redux/api/guideApi';
import RHFTextField from '@/components/core/RHFTextField';
import { useSnackbar } from 'hooks/useSnackbar';
import { RHFAutocomplete } from '@/components/core/RHFAutocomplete';
import { languages } from '@/lib/data/languages';

type GuideFormProps = {
  onClose?: VoidFunction;
  guide?: Guide;
  onEdit?: any;
  isDisabled?: boolean;
};

export const GuideForm: FC<GuideFormProps> = ({
  onClose,
  guide,
  onEdit,
  isDisabled,
}) => {
  const [createGuide, { isLoading: isCreateGuideLoading }] =
    useCreateGuideMutation();
  const { showSnackBar } = useSnackbar();
  const isSubmitLoading = isCreateGuideLoading;

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    control,
  } = useForm<GuideSchema>({
    defaultValues: guide
      ? {
          firstName: guide.firstName,
          lastName: guide.lastName,
          phoneNumber: guide.phoneNumber,
          description: guide.description || '',
          avatar: guide.avatar,
          email: guide.email,
          languages: guide.languages,
        }
      : initialValues,
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
      if (guide) {
        await onEdit({ id: guide.id, data: guideData });
        showSnackBar('Your changes were saved!', 'success');
      } else {
        await createGuide(guideData);
        showSnackBar('New guide was added!', 'success');
      }
      onClose?.();
    } catch (error) {
      // Check if the error has a message and display it in the toast notification
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';

      showSnackBar('Something went wrong', 'warning');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap='4rem'>
        <RHFTextField<GuideSchema>
          label='First Name'
          errorMessage={errors.firstName?.message}
          {...register('firstName')}
        />
        <RHFTextField<GuideSchema>
          label='Last Name'
          errorMessage={errors.lastName?.message}
          {...register('lastName')}
        />
        <RHFTextField<GuideSchema>
          label='Email'
          error={!!errors.email}
          errorMessage={errors.email?.message}
          helperText={errors.email?.message}
          {...register('email')}
        />
        <RHFTextField<GuideSchema>
          label='Phone Number'
          error={!!errors.phoneNumber}
          errorMessage={errors.phoneNumber?.message}
          helperText={errors.phoneNumber?.message}
          {...register('phoneNumber')}
        />
        <RHFTextField<GuideSchema>
          label='Bio'
          errorMessage={errors.description?.message}
          {...register('description')}
        />
        <RHFAutocomplete<GuideSchema>
          label='Languages'
          options={languages}
          control={control}
          {...register('languages')}
        />
      </Stack>
      <Stack
        mt='5.2rem'
        justifyContent='space-between'
        direction='row'
        gap='1.2rem'
      >
        <Button
          type='button'
          variant='outlined'
          color='secondary'
          fullWidth
          onClick={onClose}
          disabled={isDisabled || isSubmitLoading}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          variant='contained'
          startIcon={
            isSubmitLoading ? (
              <CircularProgress color='inherit' size='16px' />
            ) : null
          }
          fullWidth
          disabled={!isValid || isSubmitLoading || isDisabled}
        >
          {guide ? ' Edit Guide' : 'Add Guide'}
        </Button>
      </Stack>
    </form>
  );
};
