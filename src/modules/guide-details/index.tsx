'use client';

import { useModal } from 'hooks/useModal';
import React from 'react';
import { Divider, Stack, Typography, useTheme } from '@mui/material';
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

export const GuideDetail = ({
  guide,
  guides,
}: {
  guide: GuideType;
  guides?: GuideType[];
}) => {
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
  const theme = useTheme();
  const { openModal, closeModal } = useModal();
  const hasExpeditions = expeditions?.length > 0;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const onDelete = async (id: string) => {
    await deleteGuide(id);

    // Find the first remaining guide after deletion
    const remainingGuides = guides?.filter((g) => g.id !== id);
    const firstGuideId =
      remainingGuides && remainingGuides.length > 0
        ? remainingGuides[0].id
        : null;

    params.delete('guideId');
    if (firstGuideId) {
      params.set('guideId', firstGuideId);
    }

    router.push(`${routes.guides}?${params.toString()}`);
    showSnackBar('Guide was deleted', 'success');
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
      borderRadius={theme.borderRadius.medium}
      bgcolor='white'
      height='100%'
      overflow='auto'
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
