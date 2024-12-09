import React from 'react';
import { GuideForm } from '@/modules/forms/GuideForm';
import { PageHeader } from '@/modules/page-header';
import { Box, Stack } from '@mui/material';

const PageContent = async () => {
  return (
    <Stack p='1.6rem' gap='3rem'>
      <PageHeader title='New guide' />
      <Box maxWidth='sm' m='0 auto' width='100%'>
        <GuideForm />
      </Box>
    </Stack>
  );
};

export default PageContent;
