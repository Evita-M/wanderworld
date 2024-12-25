'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader } from '@/components/core/Loader';
import { PageHeader } from '@/modules/page-header';
import { Box, Stack, Typography } from '@mui/material';
import { routes } from '@/routes/index';
import { BackButton } from '@/components/core/BackButton';
import { useGetGuideQuery } from '@/redux/api/guideApi';
import { GuideForm } from '@/modules/forms/GuideForm';

const PageContent = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: guide, isLoading: isGuideLoading } = useGetGuideQuery(
    id as string
  );

  const redirectToGuides = () => {
    router.push(`${routes.guides}?${id}`);
  };

  if (!guide && !isGuideLoading) {
    return <Typography>Guide not found</Typography>;
  }

  return (
    <Stack height='100%'>
      <PageHeader
        title='Edit Guide'
        prefix={<BackButton color='secondary' onClick={redirectToGuides} />}
        sx={{ mb: '4rem' }}
      />
      {isGuideLoading ? (
        <Box
          display='flex'
          justifyContent='center'
          height='100%'
          flex='1 1 100%'
        >
          <Loader />
        </Box>
      ) : (
        <GuideForm
          guide={guide}
          isEdit={true}
          onCancel={redirectToGuides}
          onSuccess={redirectToGuides}
        />
      )}
    </Stack>
  );
};

export default PageContent;
