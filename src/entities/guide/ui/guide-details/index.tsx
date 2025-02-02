'use client';

import { useMemo, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { GuideHeader, GuideHeaderSize } from '../guide-header';
import { GuideExpeditions } from '../guide-expeditions';
import { grey } from '@mui/material/colors';
import { borderRadius } from '@/styles/border-radius';
import { sortByDate } from '@/utils/sort-by-date';
import { Guide, GuideWithExpeditions } from '../../model';
import { LanguageCode } from '@/shared/ui/modules/languages';
import { RichTextRenderer } from '@/shared/ui/components/rich-text';
import { GuideActions } from '../guide-actions';
import { SortOrder } from '@/features/expedition/sort';

export const GuideDetail = ({
  guide,
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
  const hasExpeditions = expeditions?.length > 0;
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
         <SortOrder
           sortOrder={sortOrder}
           onSortChange={setSortOrder}
         />
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
