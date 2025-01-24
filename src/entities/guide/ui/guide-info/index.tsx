'use client';
import { FC } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import theme from '@/styles/theme';
import { Guide } from '../../model';
import { Avatar } from '@/shared/ui/core/avatar';
import { Contact } from '@/shared/ui/modules/contact';

interface GuideInfoProps {
  guide: Guide | null | undefined;
}

const GuideLabel: FC = () => {
  const theme = useTheme();
  return (
    <Box
      bgcolor={theme.palette.secondary.main}
      p='1rem 1.4rem'
      borderRadius={`0 0 0 ${theme.borderRadius.large}`}
      position='absolute'
      top='0'
      right='0'
    >
      <Typography color='white'>Guide</Typography>
    </Box>
  );
};
const GuideDetails: FC<{ guide: Guide }> = ({ guide }: { guide: Guide }) => (
  <Stack alignItems='center' textAlign='center'>
    <Avatar src={guide.avatar} alt={`${guide.firstName} ${guide.lastName}`} />
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
    <Avatar />
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
    borderRadius={theme.borderRadius.large}
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
