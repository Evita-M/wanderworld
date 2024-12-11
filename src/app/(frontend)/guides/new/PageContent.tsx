'use client';

import React from 'react';
import { GuideForm } from '@/modules/forms/GuideForm';
import { PageHeader } from '@/modules/page-header';
import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { routes } from '@/routes/index';
import { PageContainer } from '@/components/core/PageContainer';

const PageContent = () => {
  const router = useRouter();
  const redirectToGuides = () => router.push(routes.guides);

  return (
    <PageContainer>
      <PageHeader title='New guide' sx={{ mb: '4rem' }} />
      <Box maxWidth='sm' m='0 auto' width='100%'>
        <GuideForm onRedirect={redirectToGuides} />
      </Box>
    </PageContainer>
  );
};

export default PageContent;
