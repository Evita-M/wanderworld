'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetExpeditionQuery } from '@/redux/api/expeditionApi';
import { Loader } from '@/components/core/Loader';
import { ExpeditionsForm } from '@/modules/forms/ExpeditionForm';
import { PageHeader } from '@/modules/page-header';
import { Box, Stack, Typography } from '@mui/material';
import { routes } from '@/routes/index';

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
    <Stack height='100%' gap='3rem'>
      <PageHeader title='Edit Expedition' />
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
