import { useModal } from 'hooks/useModal';
import React, { useState } from 'react';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { Guide } from '@prisma/client';
import { GuideHeader, GuideHeaderSize } from '../guide-header';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GuideExpeditions } from '../guide-expeditions';
import { MenuList } from '@/components/core/MenuList';
import { grey } from '@mui/material/colors';
import { ConfirmationModal } from '@/components/core/ConfirmationModal';

export const GuideDetail = ({
  guide,
  onDelete,
  onEdit,
  isDisabled,
}: {
  guide: Guide;
  onDelete: any;
  onEdit: any;
  isDisabled?: boolean;
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
    expeditions,
  } = guide;
  const fullName = `${firstName} ${lastName}`;

  const [open, setOpen] = useState(false);
  const { openModal, closeModal } = useModal();
  const hasExpeditions = expeditions?.length > 0;

  const handleOnDelete = () => {
    openModal({
      title: 'Delete guide',
      content: (
        <ConfirmationModal
          text={`Are you sure you want to delete ${fullName}?`}
          onSubmit={() => onDelete(id)}
          isDisabled={isDisabled}
        />
      ),
    });
  };

  const guideMenuItems = [
    { label: 'Edit', icon: <EditIcon />, onClick: () => onEdit(guide) },
    {
      label: 'Delete',
      icon: <DeleteIcon sx={{ color: '#C1292E' }} />,
      onClick: () => handleOnDelete(),
    },
  ];

  return (
    <Stack
      p={4}
      borderRadius='1.2rem'
      bgcolor='white'
      height='100%'
      border={`1px solid ${grey[300]}`}
    >
      <Stack mb={4} position='relative'>
        <GuideHeader
          fullName={fullName}
          languages={languages}
          phoneNumber={phoneNumber}
          email={email}
          avatarSrc={avatar}
          size={GuideHeaderSize.LG}
        />
        <Box position='absolute' right={0} top='0'>
          <MenuList items={guideMenuItems} />
        </Box>
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
