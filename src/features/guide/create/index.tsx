'use client';
import { FC } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useCreateGuideMutation } from '@/entities/guide/api';
import { useSnackbar } from '@/lib/hooks/useSnackbar';
import { useRouter } from 'next/navigation';
import { GuideForm, GuideFormSchema } from '@/shared/ui/modules/guide-form';
import { routes } from '@/lib/config/routes';
import { CreateGuideRequestBody } from '@/app/(backend)/api/guides/schema';

export const CreateGuide: FC = () => {
  const [createGuide, { isLoading: isCreateGuideLoading }] =
    useCreateGuideMutation();
  const router = useRouter();
  const { showSnackBar } = useSnackbar();

  const handleOnCancel = () => {
    router.back();
  };

  async function handleOnSubmit(data: GuideFormSchema) {
    const guideData: CreateGuideRequestBody = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      description: data.description,
      languages: data.languages,
    };
    console.log(guideData);
    try {
      await createGuide(guideData).unwrap();
      showSnackBar('New guide was created!', 'success');
      router.push(`${routes.guides}`);
    } catch (error) {
      const err = error as FetchBaseQueryError;
      const message =
        (err.data as { message: string })?.message || 'Something went wrong';
      showSnackBar(message, 'error');
    }
  }

  return (
    <GuideForm
      onSubmit={handleOnSubmit}
      onCancel={handleOnCancel}
      isSubmitting={isCreateGuideLoading}
      buttonLabels={{
        submit: 'Create',
        cancel: 'Cancel',
      }}
    />
  );
};
