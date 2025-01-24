'use client';

import {
  useDeleteExpeditionMutation,
  useGetExpeditionQuery,
} from '@/redux/api/expeditionApi';
import { useParams, useRouter } from 'next/navigation';
import { Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { routes } from '@/routes/index';
import { useModal } from '@/shared/hooks/useModal';
import { useSnackbar } from '@/shared/hooks/useSnackbar';
import { useGetGuideQuery } from '@/entities/guide/api';
import { Loader } from '@/shared/ui/core/loader';
import { Actions } from '@/shared/ui/modules/actions';
import { PageHeader } from '@/shared/ui/core/typography';
import { ExpeditionView } from '@/entities/expedition/ui/expedition-view';
import { ModalConfirmation } from '@/shared/ui/modules/modal';


const PageContent = () => {
  const { id } = useParams();
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { showSnackBar } = useSnackbar();
  const [deleteExpedition, { isLoading: isDeleteExpeditionLoading }] =
    useDeleteExpeditionMutation();

  const {
    data: expedition,
    isLoading: isExpeditionLoading,
    isError: isExpeditionError,
  } = useGetExpeditionQuery(id as string);

  const {
    data: guide,
    isLoading: isGuideLoading,
    isError: isGuideError,
  } = useGetGuideQuery(expedition?.guideId ?? '', {
    skip: !expedition?.guideId,
  });

  if (isExpeditionLoading || isGuideLoading) {
    return (
      <Stack justifyContent='center' height='100%' flex='1 1 100%'>
        <Loader />
      </Stack>
    );
  }

  if (isExpeditionError || isGuideError) {
    throw new Error('Failed to load expedition details');
  }

  const handleDelete = async () => {
    try {
      await deleteExpedition(id as string).unwrap();
      closeModal();
      showSnackBar('Expedition deleted successfully', 'success');
      router.push('/expeditions');
    } catch (error) {
      showSnackBar('Failed to delete expedition', 'error');
    }
  };

  const handleDeleteConfirmation = () => {
    openModal({
      title: 'Delete expedition',
      content: (
        <ModalConfirmation
          text={`Are you sure you want to delete expedition ${expedition?.name}?`}
          submitBtnLabel='Delete'
          onCancel={closeModal}
          onSubmit={handleDelete}
          isDisabled={isDeleteExpeditionLoading}
        />
      ),
    });
  };

  const actions = [
    {
      label: 'Edit',
      icon: <EditIcon />,
      onClick: () => router.push(`${routes.expeditions}/${id}/edit`),
    },
    {
      label: 'Delete',
      icon: <DeleteIcon />,
      onClick: handleDeleteConfirmation,
      color: 'error' as const,
    },
  ];

  return (
    expedition && (
      <>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          mb='2.4rem'
        >
          <PageHeader title={expedition.name} />
          <Actions actions={actions} />
        </Stack>
        <ExpeditionView expedition={expedition} guide={guide} />
      </>
    )
  );
};

export default PageContent;
