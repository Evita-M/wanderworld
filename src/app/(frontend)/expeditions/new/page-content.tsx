'use client';

import { BackButton } from '@/ui/core/button';
import { PageContainer } from '@/ui/core/layout';
import { ExpeditionsForm } from '@/modules/forms/expedition';
import { PageHeader } from '@/ui/core/typography';
import { routes } from '@/routes/index';
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
        <ExpeditionsForm
          onSuccess={redirectToExpeditions}
          onCancel={redirectToExpeditions}
        />
      </Box>
    </PageContainer>
  );
};

export default PageContent;
