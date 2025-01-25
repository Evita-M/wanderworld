'use client';

import { useMemo, useState } from 'react';
import { Box, MenuItem, Select, Stack, Typography } from '@mui/material';
import { GuideHeader, GuideHeaderSize } from '../guide-header';
import { GuideExpeditions } from '../guide-expeditions';
import { grey } from '@mui/material/colors';
import { routes } from '@/routes/index';
import { useRouter, useSearchParams } from 'next/navigation';
import { borderRadius } from '@/styles/border-radius';
import { sortByDate } from '@/utils/sort-by-date';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Guide, GuideWithExpeditions } from '../../model';
import { useSnackbar } from '@/shared/hooks/useSnackbar';
import { useModal } from '@/shared/hooks/useModal';
import { useDeleteGuideMutation } from '../../api';
import { LanguageCode } from '@/shared/ui/modules/languages';
import { RichTextRenderer } from '@/shared/ui/components/rich-text';
import { ModalConfirmation } from '@/shared/ui/modules/modal';
import { GuideActions } from '../guide-actions';

export const GuideDetail = ({
  guide,
  guides,
}: {
  guide: GuideWithExpeditions;
  guides?: Guide[];
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
  const [deleteGuide, { isLoading: isDeleteGuideLoading }] =
    useDeleteGuideMutation();
  const { showSnackBar } = useSnackbar();
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const hasExpeditions = expeditions?.length > 0;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedExpeditions = useMemo(() => {
    if (!hasExpeditions) return [];
    return sortByDate([...expeditions], 'startDate', sortOrder);
  }, [expeditions, sortOrder, hasExpeditions]);




  return (
    <Stack
      p={4}
      height='100%'
      overflow='auto'
      border={`1px solid ${grey[300]}`}
      borderRadius={borderRadius.large}
      gap={5}
    >
      <Stack>
        <GuideHeader
          fullName={fullName}
          languages={languages as LanguageCode[]}
          phoneNumber={phoneNumber}
          email={email}
          avatarSrc={avatar}
          size={GuideHeaderSize.LG}
          actions={<GuideActions id={id} fullName={fullName} />}
        />
      </Stack>
      <Box>
        <Typography variant='h5' component='h3' mb='1.6rem'>
          Profile
        </Typography>
        <RichTextRenderer content={description || ''} />
      </Box>

      <Box>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          mb='1.6rem'
        >
          <Typography variant='h5' component='h3'>
            Expeditions
          </Typography>
          {hasExpeditions && (
          <Select
            value={sortOrder}
            size='small'
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          >
            <MenuItem value='desc'>Latest First</MenuItem>
            <MenuItem value='asc'>Oldest First</MenuItem>
          </Select>
          )}
        </Stack>
        {hasExpeditions ? (
          <GuideExpeditions expeditions={sortedExpeditions} />
        ) : (
          <Typography>No expeditions</Typography>
        )}
      </Box>
    </Stack>
  );
};
