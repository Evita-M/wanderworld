'use client';
import { EditGuide } from '@/features/edit-guide/edit-guide';
import { Stack, Typography } from '@mui/material';

const PageContent = () => {
  return (
    <Stack height='100%'>
      <Typography variant='h3' mb='4rem'>
        Edit Guide
      </Typography>
      <EditGuide />
    </Stack>
  );
};

export default PageContent;
