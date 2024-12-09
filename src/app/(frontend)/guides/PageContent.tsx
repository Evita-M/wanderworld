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
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { GuideDetail } from '@/modules/guide-details';
import { Guide } from '@prisma/client';
import { PageHeader } from '@/modules/page-header';
import { Loader } from '@/components/core/Loader';
import { EmptyState } from '@/components/core/EmptyState';
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

  useEffect(() => {
    if (guides?.length && !guideId) {
      const firstGuide = guides[0];
      params.set('guideId', firstGuide.id);
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [guides, guideId, router, params]);

  const handleGuideClick = (guide: Guide) => {
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

  const selectedGuide = guides?.find((guide) => guide.id === guideId) || null;

  const handleAddNewGuide = () => router.push(routes.newGuide);

  return (
    <Stack height='100%' gap='3rem'>
      <PageHeader
        title='Guides'
        buttonLabel='Add new guide'
        onClick={handleAddNewGuide}
      />
      <Stack
        sx={{
          height: 'calc(100vh - 24rem)',
          overflow: 'hidden',
        }}
      >
        {isGetGuidesLoading ? (
          <Loader />
        ) : guides?.length ? (
          <Stack direction='row' flex={1} spacing={3} overflow='hidden'>
            <Stack spacing={3} width='40%' sx={{ overflowY: 'auto' }}>
              {guides.map((guide) => (
                <GuideItem
                  key={guide.id}
                  guide={guide}
                  onClick={() => handleGuideClick(guide)}
                  isSelected={selectedGuide?.id === guide.id}
                />
              ))}
            </Stack>
            <Stack flex={1} overflow='auto'>
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
        ) : (
          <Stack height='100%'>
            <EmptyState
              title='No Guides Found'
              description='Get started by adding your first guide'
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Guides;
