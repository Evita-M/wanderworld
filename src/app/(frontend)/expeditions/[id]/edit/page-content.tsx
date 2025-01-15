'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetExpeditionQuery } from '@/redux/api/expeditionApi';
import { PageHeader } from '@/ui/core/typography';
import { Box, Stack, Typography } from '@mui/material';
import { routes } from '@/routes/index';
import { ExpeditionsForm } from '@/modules/forms/expedition';
import { BackButton } from '@/ui/core/button';
import { Loader } from '@/ui/core/loader';

const PageContent = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: expedition, isLoading: isExpeditionLoading } =
    useGetExpeditionQuery(id as string);

  const redirectToExpeditions = () => {
    router.push(`${routes.expeditions}/${id}`);
  };

  if (!expedition && !isExpeditionLoading) {
    return <Typography>Expedition not found</Typography>;
  }

  return (
    <Stack height='100%'>
      <PageHeader
        title='Edit Expedition'
        prefix={
          <BackButton color='secondary' onClick={redirectToExpeditions} />
        }
        sx={{ mb: '4rem' }}
      />
      {isExpeditionLoading ? (
        <Box
          display='flex'
          justifyContent='center'
          height='100%'
          flex='1 1 100%'
        >
          <Loader />
        </Box>
      ) : (
        <ExpeditionsForm
          expedition={expedition}
          isEdit={true}
          onCancel={redirectToExpeditions}
          onSuccess={redirectToExpeditions}
        />
      )}
    </Stack>
  );
};

export default PageContent;
