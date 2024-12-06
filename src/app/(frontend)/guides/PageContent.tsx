'use client';

import { FC, useEffect } from 'react';
import { Stack } from '@mui/material';
import {
  useDeleteGuideMutation,
  useGetGuidesQuery,
  useUpdateGuideMutation,
} from '@/redux/api/guideApi';

import { GuideForm } from '@/modules/forms/GuideForm';
import { useModal } from 'hooks/useModal';
import { GuideItem } from '@/modules/guide-item';
import { useRouter, useSearchParams } from 'next/navigation';
import { GuideDetail } from '@/modules/guide-details';
import { Guide } from '@prisma/client';
import { PageHeader } from '@/modules/page-header';
import { routes } from '@/routes/index';

const Guides: FC = () => {
  const { openModal, closeModal } = useModal();
  const {
    data: guides,
    isLoading: isGetGuidesLoading,
    refetch: refetchGuides,
  } = useGetGuidesQuery();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const guideId = searchParams.get('guideId');
  const [deleteGuide, { isLoading: isDeleteGuideLoading }] =
    useDeleteGuideMutation();
  const [
    updateGuide,
    { isLoading: isUpdateGuideLoading, isSuccess: isUpdateGuideSuccess },
  ] = useUpdateGuideMutation();

  useEffect(() => {
    if (isUpdateGuideSuccess) {
      refetchGuides();
    }
  }, [refetchGuides, isUpdateGuideSuccess]);

  const handleOpenModal = () => {
    openModal({
      content: <GuideForm onClose={closeModal} />,
      title: 'Add new guide',
    });
  };

  const handleGuideClick = (guide: Guide) => {
    // Set the guideId in the URL, which will automatically update selectedGuide
    params.set('guideId', guide.id);
    router.push(`?${params.toString()}`);
  };

  const handleEditGuide = (guide: Guide) => {
    openModal({
      content: (
        <GuideForm
          guide={guide}
          onClose={closeModal}
          onEdit={updateGuide}
          isDisabled={isUpdateGuideLoading}
        />
      ),
      title: 'Edit a guide',
    });
  };

  const handleDeleteGuide = async (id: string) => {
    await deleteGuide(id);
    params.delete('guideId');
    router.push(`?${params.toString()}`);
  };

  // Derive selectedGuide based on guideId from the URL
  const selectedGuide = guides?.find((guide) => guide.id === guideId) || null;

  return (
    <Stack
      height='100%'
      flex='1 1 auto'
      overflow='hidden'
      gap='2.4rem'
      p='1.6rem'
    >
      <PageHeader
        title='Guides'
        href={routes.newGuide}
        buttonLabel='Add new guide'
      />
      <Stack
        height='100%'
        flex='1 1 auto'
        overflow='hidden'
        direction='row'
        gap='2.4rem'
        p='1.6rem'
      >
        <Stack
          gap='2.4rem'
          pb='0.6rem'
          sx={{ height: '100%', overflowY: 'auto', flex: '0 0 40%' }}
        >
          {guides?.map((guide) => (
            <GuideItem
              guide={guide}
              onClick={() => handleGuideClick(guide)}
              isSelected={selectedGuide?.id === guide.id}
              key={guide.id}
            />
          ))}
        </Stack>
        <Stack width='100%' height='100%' sx={{ overflowY: 'auto' }}>
          {selectedGuide && (
            <GuideDetail
              guide={selectedGuide}
              onDelete={handleDeleteGuide}
              onEdit={handleEditGuide}
              isDisabled={isDeleteGuideLoading}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Guides;
