'use client';

import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/config/routes';
import { PageContainer } from '@/shared/ui/core/layout/page-container';
import { PageHeader } from '@/shared/ui/core/typography/page-header';
import { BackButton } from '@/shared/ui/core/button/back-button';
import { CreateExpedition } from '@/features/create-expedition/create-expedition';

const PageContent = () => {
  const router = useRouter();
  const redirectToExpeditions = () => router.push(routes.expeditions);

  return (
    <PageContainer maxWidth='140rem'>
      <PageHeader
        title='New expedition'
        sx={{ mb: '4rem' }}
        prefix={
          <BackButton onClick={redirectToExpeditions} color='secondary' />
        }
      />
      <Box maxWidth='lg' m='0 auto' width='100%'>
        <CreateExpedition />
      </Box>
    </PageContainer>
  );
};

export default PageContent;
