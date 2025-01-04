'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  useDeleteExpeditionMutation,
  useGetExpeditionQuery,
} from '@/redux/api/expeditionApi';

import { Loader } from '@/components/core/Loader';
import { ExpeditionDetail } from '@/modules/expedition-detail';
import { Box, Stack, Typography } from '@mui/material';
import { useModal } from 'hooks/useModal';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'hooks/useSnackbar';
import { useGetGuideQuery } from '@/redux/api/guideApi';
import { PageHeader } from '@/modules/page-header';
import { routes } from '@/routes/index';
import { ConfirmationModal } from '@/components/core/ConfirmationModal';
import { Actions } from '@/modules/actions';
import { GuideInfo } from '@/modules/guide-info';

const PageContent = () => {
  const { id } = useParams();
  const { openModal, closeModal } = useModal();
  const {
    data: expedition,
    isLoading: isExpeditionLoading,
    isError: isExpeditionError,
  } = useGetExpeditionQuery(id as string);
  const { showSnackBar } = useSnackbar();
  const router = useRouter();
  const [deleteExpedition, { isLoading: isDeleteExpeditionLoading }] =
    useDeleteExpeditionMutation();
  const {
    data: guide,
    isLoading: isGetGuideLoading,
    isError: isGuideError,
  } = useGetGuideQuery(expedition?.guideId as string, {
    skip: !expedition?.guideId,
  });
  const isLoading = isExpeditionLoading || isGetGuideLoading;
  const onDelete = async (id: string) => {
    try {
      if (id) {
        await deleteExpedition(id as string);
        closeModal();
        showSnackBar('Your changes were saved!', 'success');
        router.push('/expeditions');
      }
    } catch (error) {
      showSnackBar('Something went wrong', 'warning');
    }
  };

  const handleOnDelete = () => {
    openModal({
      title: 'Delete expedition',
      content: (
        <ConfirmationModal
          text={`Are you sure you want to delete expedition ${expedition?.name}?`}
          submitBtnLabel='Delete'
          onCancel={closeModal}
          onSubmit={() => onDelete(expedition?.id as string)}
          isDisabled={isDeleteExpeditionLoading}
        />
      ),
    });
  };

  const handleEdit = () => {
    router.push(`${routes.expeditions}/${id}/edit`);
  };

  useEffect(() => {
    if (isExpeditionError) {
      throw new Error('Expedition failed to load');
    }
  }, [isExpeditionError]);

  useEffect(() => {
    if (isGuideError) {
      throw new Error('Guide failed to load');
    }
  }, [isGuideError]);

  return (
    <>
      {isExpeditionLoading ? (
        <Box
          display='flex'
          justifyContent='center'
          height='100%'
          flex='1 1 100%'
        >
          <Loader />
        </Box>
      ) : (
        <>
          <Stack
            mb='2rem'
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Box>{expedition && <PageHeader title={expedition.name} />}</Box>
            <Actions onEdit={handleEdit} onDelete={handleOnDelete} />
          </Stack>
          {expedition && (
            <ExpeditionDetail expedition={expedition} guide={guide} />
          )}
        </>
      )}
    </>
  );
};

export default PageContent;
