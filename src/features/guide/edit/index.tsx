'use client';

import { FC } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useUpdateGuideMutation } from '@/entities/guide/api';
import { useSnackbar } from '@/lib/hooks/useSnackbar';
import { Guide, GuideCommon } from '@/entities/guide/model';
import { GuideForm } from '@/shared/ui/modules/guide-form';
import { useRouter } from 'next/navigation';

import { GuideSchema } from '@/shared/ui/modules/guide-form/validation';
interface EditGuideProps {
  guide: GuideCommon;
}

export const EditGuide: FC<EditGuideProps> = ({ guide }) => {
  const [updateGuide, { isLoading: isUpdateGuideLoading }] =
    useUpdateGuideMutation();
  const { showSnackBar } = useSnackbar();
  const router = useRouter();

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
    <GuideForm
      onSubmit={handleOnSubmit}
      onCancel={handleOnCancel}
      isSubmitting={isUpdateGuideLoading}
      guide={guide}
      buttonLabels={{ cancel: 'Cancel', submit: 'Save changes' }}
    />
  );
};
