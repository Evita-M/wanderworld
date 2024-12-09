import React, { FC } from 'react';
import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material';
import { Guide } from '@prisma/client';
import { grey } from '@mui/material/colors';
import { Contact } from '../contact';

import { EmptyAvatar } from '@/components/core/EmptyAvatar';

interface GuideInfoProps {
  guide?: Guide;
}

const GuideLabel: FC = () => {
  const theme = useTheme();
  return (
    <Box
      bgcolor={theme.palette.secondary.main}
      p='1rem 1.4rem'
      borderRadius='0 0 0 1rem'
      position='absolute'
      top='0'
      right='0'
    >
      <Typography color='white'>Guide</Typography>
    </Box>
  );
};

const GuideAvatar: React.FC<{ guide: Guide }> = ({
  guide,
}: {
  guide: Guide;
}) => (
  <Avatar
    src={guide.avatar}
    alt={`${guide.firstName} ${guide.lastName}`}
    sx={{
      width: 140,
      height: 140,
    }}
  />
);

const GuideDetails: FC<{ guide: Guide }> = ({ guide }: { guide: Guide }) => (
  <Stack alignItems='center' textAlign='center'>
    <GuideAvatar guide={guide} />
    <Typography variant='h6' pt='1.2rem'>
      {guide.firstName} {guide.lastName}
    </Typography>
    <Contact
      email={guide.email}
      phoneNumber={guide.phoneNumber}
      variant='column'
    />
  </Stack>
);

const EmptyGuide: FC = () => (
  <>
    <EmptyAvatar size={140} />
    <Typography variant='h6' pt='1.2rem'>
      No Guide
    </Typography>
    <Typography color='text.secondary' pt='1.2rem'>
      Guide to be assigned soon
    </Typography>
  </>
);

export const GuideInfo: FC<GuideInfoProps> = ({ guide }: GuideInfoProps) => (
  <Box
    borderRadius='2rem'
    overflow='hidden'
    position='relative'
    height='39.5rem'
    width='39.5rem'
    p='4.4rem 1.6rem'
    border={`1px solid ${grey[300]}`}
  >
    <GuideLabel />
    <Stack alignItems='center' textAlign='center' height='100%'>
      {guide ? <GuideDetails guide={guide} /> : <EmptyGuide />}
    </Stack>
  </Box>
);
