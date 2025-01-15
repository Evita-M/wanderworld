'use client';

import { useModal } from 'hooks/useModal';
import { useMemo, useState } from 'react';
import { Box, MenuItem, Select, Stack, Typography } from '@mui/material';
import { GuideHeader, GuideHeaderSize } from '../guide-header';
import { GuideExpeditions } from '../guide-expeditions';
import { grey } from '@mui/material/colors';
import { useDeleteGuideMutation } from '@/redux/api/guideApi';
import { useSnackbar } from 'hooks/useSnackbar';
import { routes } from '@/routes/index';
import { Actions } from '../actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { LanguageCode } from '../languages';
import { borderRadius } from '@/styles/border-radius';
import { sortByDate } from '@/utils/sort-by-date';
import { Guide, GuideWithExpeditions } from '@/types/guide';

import { ModalConfirmation } from '../modal-confirmation';
import { RichTextRenderer } from '@/ui/components/rich-text';

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
  console.log(expeditions);
  const { openModal, closeModal } = useModal();
  const hasExpeditions = expeditions?.length > 0;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedExpeditions = useMemo(() => {
    if (!hasExpeditions) return [];
    return sortByDate([...expeditions], 'startDate', sortOrder);
  }, [expeditions, sortOrder, hasExpeditions]);

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
        <ModalConfirmation
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
          actions={
            <Actions
              onEdit={handleEdit}
              onDelete={handleOnDelete}
              variant='icon'
            />
          }
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
          <Select
            value={sortOrder}
            size='small'
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          >
            <MenuItem value='desc'>Latest First</MenuItem>
            <MenuItem value='asc'>Oldest First</MenuItem>
          </Select>
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
