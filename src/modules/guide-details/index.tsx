import { useModal } from 'hooks/useModal';
import React, { useState } from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { Guide as GuideType } from '@prisma/client';
import { GuideHeader, GuideHeaderSize } from '../guide-header';

import { GuideExpeditions } from '../guide-expeditions';
import { grey } from '@mui/material/colors';
import { ConfirmationModal } from '@/components/core/ConfirmationModal';

import { useDeleteGuideMutation } from '@/redux/api/guideApi';
import { useSnackbar } from 'hooks/useSnackbar';

import { routes } from '@/routes/index';
import { Actions } from '../actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { LanguageCode } from '../languages';

export const GuideDetail = ({ guide }: { guide: GuideType }) => {
  const {
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    languages,
    avatar,
    description,
    // @ts-ignore
    expeditions,
  } = guide;
  const fullName = `${firstName} ${lastName}`;
  const [deleteGuide, { isLoading: isDeleteGuideLoading }] =
    useDeleteGuideMutation();
  const { showSnackBar } = useSnackbar();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { openModal, closeModal } = useModal();
  const hasExpeditions = expeditions?.length > 0;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const onDelete = async (id: string) => {
    await deleteGuide(id);
    params.delete('guideId');
    closeModal();
  };

  const handleOnDelete = () => {
    openModal({
      title: 'Delete guide',
      content: (
        <ConfirmationModal
          text={`Are you sure you want to delete guide ${fullName}?`}
          submitBtnLabel='Delete'
          onCancel={closeModal}
          onSubmit={() => onDelete(id as string)}
          isDisabled={isDeleteGuideLoading}
        />
      ),
    });
  };

  const handleEdit = () => {
    router.push(`${routes.guides}/${id}/edit`);
  };

  return (
    <Stack
      p={4}
      borderRadius='1.2rem'
      bgcolor='white'
      height='100%'
      border={`1px solid ${grey[300]}`}
    >
      <Stack mb={4}>
        <GuideHeader
          fullName={fullName}
          languages={languages as LanguageCode[]}
          phoneNumber={phoneNumber}
          email={email}
          avatarSrc={avatar}
          size={GuideHeaderSize.LG}
          actions={
            <Actions
              onEdit={handleEdit}
              onDelete={handleOnDelete}
              variant='icon'
            />
          }
        />
      </Stack>
      <Typography variant='h5' component='h3' mb='1.6rem'>
        Profile
      </Typography>
      <Typography>{description}</Typography>
      <Divider sx={{ m: '3.2rem' }} />
      <Typography variant='h5' component='h3' mb='1.6rem'>
        Expeditions
      </Typography>
      {hasExpeditions ? (
        <GuideExpeditions expeditions={expeditions} />
      ) : (
        <Typography>No expeditions</Typography>
      )}
    </Stack>
  );
};
