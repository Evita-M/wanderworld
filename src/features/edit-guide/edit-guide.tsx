'use client';

import { FC } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useGetGuideQuery, useUpdateGuideMutation } from '@/entities/guide/api';
import { useSnackbar } from '@/lib/hooks/use-snackbar';
import { GuideForm } from '@/shared/ui/modules/guide-form/guide-form';
import { notFound, useParams, useRouter } from 'next/navigation';
import { GuideFormSchema } from '@/shared/ui/modules/guide-form/validation';
import { UpdateGuideRequestBody } from '@/app/(backend)/api/guides/schema';
import { Loader } from '@/shared/ui/core/loader/loader';

export const EditGuide: FC = () => {
  const { id } = useParams();
  const { data: guideData, isLoading: isGetGuideLoading } = useGetGuideQuery(
    id as string
  );
  const [updateGuide, { isLoading: isUpdateGuideLoading }] =
    useUpdateGuideMutation();
  const { showSnackBar } = useSnackbar();
  const router = useRouter();

  const handleOnCancel = () => {
    router.back();
  };

  if (!guideData && !isGetGuideLoading) {
    notFound();
  }

  async function handleOnSubmit(data: GuideFormSchema) {
    const guideData: UpdateGuideRequestBody = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      description: data.description,
      avatar: data.avatar,
      languages: data.languages,
    };

    try {
      if (guideData) {
        await updateGuide({
          id: guideData.id,
          data: guideData,
        }).unwrap();
        showSnackBar('Your changes were saved!', 'success');
        router.back();
      }
    } catch (error) {
      const err = error as FetchBaseQueryError;
      const message =
        (err.data as { message: string })?.message || 'Something went wrong';
      showSnackBar(message, 'error');
    }
  }

  if (!guideData && !isGetGuideLoading) {
    notFound();
  }

  const remapedGuide = guideData
    ? {
        id: guideData.id,
        firstName: guideData.firstName,
        lastName: guideData.lastName,
        email: guideData.email,
        phoneNumber: guideData.phoneNumber,
        description: guideData.description || undefined,
        avatar: guideData.avatar,
        languages: guideData.languages.map((l) => ({
          code: l.code,
          name: l.name,
        })),
      }
    : undefined;

  return isGetGuideLoading ? (
    <Loader />
  ) : (
    <GuideForm
      onSubmit={handleOnSubmit}
      onCancel={handleOnCancel}
      isSubmitting={isUpdateGuideLoading}
      guide={remapedGuide}
      buttonLabels={{ cancel: 'Cancel', submit: 'Save changes' }}
    />
  );
};
