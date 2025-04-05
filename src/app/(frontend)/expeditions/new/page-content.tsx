'use client';

import { Box } from '@mui/material';
import { routes } from '@/lib/config/routes';
import { PageContainer } from '@/shared/ui/core/layout/page-container';
import { PageHeader } from '@/shared/ui/core/typography/page-header';
import { BackButton } from '@/shared/ui/core/button/back-button';
import { CreateExpedition } from '@/features/create-expedition/create-expedition';

const PageContent = () => {
  return (
    <PageContainer maxWidth='140rem'>
      <PageHeader
        title='New expedition'
        sx={{ mb: '4rem' }}
        prefix={<BackButton />}
      />
      <Box maxWidth='lg' m='0 auto' width='100%'>
        <CreateExpedition />
      </Box>
    </PageContainer>
  );
};

export default PageContent;
