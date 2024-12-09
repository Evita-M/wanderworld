'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  useDeleteExpeditionMutation,
  useGetExpeditionQuery,
} from '@/redux/api/expeditionApi';
import { Loader } from '@/components/core/Loader';
import { ExpeditionDetail } from '@/modules/expedition-detail';
import { ExpeditionsForm } from '@/modules/forms/ExpeditionForm';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useModal } from 'hooks/useModal';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'hooks/useSnackbar';
import { useGetGuideQuery } from '@/redux/api/guideApi';
import { PageHeader } from '@/modules/page-header';

const PageContent = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { id } = useParams();
  const { openModal, closeModal } = useModal();
  const { data: expedition, isLoading: isExpeditionLoading } =
    useGetExpeditionQuery(id as string);
  const { showSnackBar } = useSnackbar();
  const router = useRouter();
  const [deleteExpedition, { isLoading: isDeleteExpeditionLoading }] =
    useDeleteExpeditionMutation();
  const { data: guide } = useGetGuideQuery(expedition?.guideId as string);

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
      content: (
        <>
          <Typography mb='2.4rem'>
            Are you sure you want to delete expedition {expedition?.name}?
          </Typography>
          <Stack direction='row' gap='1.2rem'>
            <Button
              variant='outlined'
              color='warning'
              onClick={closeModal}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              onClick={() => onDelete(expedition?.id as string)}
              disabled={isDeleteExpeditionLoading}
              color='warning'
              fullWidth
            >
              Delete
            </Button>
          </Stack>
        </>
      ),
      title: 'Delete expedition',
    });
  };

  const renderExpeditionDetails = () => {
    if (!expedition) {
      return null; // Return null or some fallback UI if expedition is undefined
    }

    return (
      <Box p='1.6rem'>
        <Stack
          mb='2rem'
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Box>
            <Typography variant='h1'>{expedition.name}</Typography>
          </Box>
          <Stack gap='1.2rem' direction='row'>
            <Button
              onClick={handleOnDelete}
              variant='contained'
              size='large'
              color='warning'
              disabled={isDeleteExpeditionLoading}
            >
              Delete
            </Button>
            <Button
              onClick={() => setIsEdit(true)}
              variant='contained'
              size='large'
              disabled={isDeleteExpeditionLoading}
            >
              Edit
            </Button>
          </Stack>
        </Stack>
        {isEdit ? (
          <ExpeditionsForm
            expedition={expedition}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        ) : (
          <ExpeditionDetail expedition={expedition} guide={guide} />
        )}
      </Box>
    );
  };

  return <>{isExpeditionLoading ? <Loader /> : renderExpeditionDetails()}</>;
};

export default PageContent;
