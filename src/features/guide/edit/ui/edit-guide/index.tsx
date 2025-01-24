'use client';

import { FC } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useGetGuideQuery, useUpdateGuideMutation } from '@/entities/guide/api';
import { useSnackbar } from '@/shared/hooks/useSnackbar';
import { Guide } from '@/entities/guide/model';
import { GuideSchema } from '@/features/guide/edit/model/validation';
import { GuideForm } from '@/shared/ui/modules/guide-form';
import { useParams, useRouter } from 'next/navigation';
import { Loader } from '@/shared/ui/core/loader';

export const EditGuide: FC = () => {
  const { id } = useParams();
  const [updateGuide, { isLoading: isUpdateGuideLoading }] = useUpdateGuideMutation();
  const { showSnackBar } = useSnackbar();
  const router = useRouter();
  const { data: guide, isLoading: isGetGuideLoading } = useGetGuideQuery(id as string);


  if (!guide && !isGetGuideLoading) throw new Error('Guide not found');

  const handleOnCancel = () => {
    router.back();
  };

  async function handleOnSubmit(data: GuideSchema) {
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
        await updateGuide({
          id: guide.id,
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

  return (
    <>
      {isGetGuideLoading ? <Loader /> :
        <GuideForm
          onSubmit={handleOnSubmit}
          onCancel={handleOnCancel}
          isLoading={isUpdateGuideLoading}
          guide={guide}
          buttonLabels={{ cancel: 'Cancel', submit: 'Save changes' }}
        />
      }
    </>
  );
};
