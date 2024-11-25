import React from 'react';
import { GuideForm } from '@/modules/forms/GuideForm';
import { PageHeader } from '@/modules/page-header';
import { Box, Stack } from '@mui/material';

const PageContent = async () => {
  return (
    <Stack p='1.6rem'>
      <PageHeader title='Create a new guide' />
      <Box maxWidth='sm' m='0 auto' width='100%' mt='4.8rem'>
        <GuideForm />
      </Box>
    </Stack>
  );
};

export default PageContent;
