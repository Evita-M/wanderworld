'use client';

import { CreateExpedition } from '@/features/expedition/create/ui/create-guide';
import { routes } from '@/routes/index';
import { BackButton } from '@/shared/ui/core/button';
import { PageContainer } from '@/shared/ui/core/layout';
import { PageHeader } from '@/shared/ui/core/typography';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

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
        <CreateExpedition
          onSuccess={redirectToExpeditions}
          onCancel={redirectToExpeditions}
        />
      </Box>
    </PageContainer>
  );
};

export default PageContent;
