import { ExpeditionsForm } from '@/modules/forms/ExpeditionForm';
import { PageHeader } from '@/modules/page-header';
import { Box, Stack } from '@mui/material';
import React from 'react';

const PageContent = async () => {
  return (
    <Stack p='1.6rem'>
      <PageHeader title='Create a new expedition' />
      <Box maxWidth='sm' m='0 auto' width='100%' mt='4.8rem'>
        <ExpeditionsForm />
      </Box>
    </Stack>
  );
};

export default PageContent;
