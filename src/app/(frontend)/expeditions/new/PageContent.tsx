'use client';

import { PageContainer } from '@/components/core/PageContainer';
import { ExpeditionsForm } from '@/modules/forms/ExpeditionForm';
import { PageHeader } from '@/modules/page-header';
import { routes } from '@/routes/index';
import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

const PageContent = () => {
  const router = useRouter();
  const redirectToExpeditions = () => router.push(routes.expeditions);
  return (
    <PageContainer>
      <PageHeader title='New expedition' sx={{ mb: '4rem' }} />
      <Box maxWidth='lg' m='0 auto' width='100%'>
        <ExpeditionsForm
          onSuccess={redirectToExpeditions}
          onCancel={redirectToExpeditions}
        />
      </Box>
    </PageContainer>
  );
};

export default PageContent;
