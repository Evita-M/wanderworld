'use client';
import { useGetGuideQuery } from '@/entities/guide/api';
import { GuideActions } from '@/features/guide-actions/guide-actions';
import { SortOrder } from '@/features/sort-order/sort-order';
import { RoundedContainer } from '@/shared/ui/components/rounded-container/rounded-container';
import { BackButton } from '@/shared/ui/core/button/back-button';
import { Loader } from '@/shared/ui/core/loader/loader';
import { PageHeader } from '@/shared/ui/core/typography/page-header';
import { handleRTKQueryError } from '@/utils/error-handler/error-handler';
import { sortByDate } from '@/utils/sort-by-date';
import { GuideDetail } from '@/widgets/guide-detail/ui/guide-detail';
import { GuideExpeditions } from '@/widgets/guide-expeditions/ui/guide-expeditions';
import { Box, Stack, Typography } from '@mui/material';
import { notFound, useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

const GuidePageContent = () => {
  const params = useParams();
  const id = params?.id as string;

  const {
    data: guide,
    isLoading: isGetGuideLoading,
    error: guideError,
    isError: isGetGuideError,
  } = useGetGuideQuery(id, {
    skip: !id,
  });

  const hasExpeditions = Boolean(guide?.expeditions?.length);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedExpeditions = useMemo(() => {
    if (!hasExpeditions) return [];
    return sortByDate([...(guide?.expeditions || [])], 'startDate', sortOrder);
  }, [guide?.expeditions, sortOrder, hasExpeditions]);

  if (isGetGuideError) {
    handleRTKQueryError(guideError);
  }

  if (!guide && !isGetGuideLoading) {
    notFound();
  }

  if (isGetGuideLoading) {
    return (
      <Stack justifyContent='center' height='100%' flex='1 1 100%'>
        <Loader />
      </Stack>
    );
  }

  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent='space-between'
        mb={{ xs: '2.4rem', sm: '3.2rem' }}
        spacing={{ xs: 2, sm: 0 }}
      >
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-end'
          width='100%'
        >
          <PageHeader
            title={`${guide?.firstName} ${guide?.lastName}`}
            subtitle='WanderWorld Guide'
            prefix={<BackButton />}
          />
          <GuideActions
            id={id}
            fullName={`${guide?.firstName} ${guide?.lastName}`}
          />
        </Stack>
      </Stack>

      <div className='grid gap-[2.4rem] md:grid-cols-2 lg:grid-cols-3'>
        <div className='space-y-6 md:col-span-2'>
          <RoundedContainer>
            <GuideDetail
              avatar={guide?.avatar ?? ''}
              description={guide?.description ?? ''}
            />
          </RoundedContainer>
        </div>
        <div className='row-span-2 space-y-6'>
          <RoundedContainer sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ p: 2 }}>
              Guide Profile
            </Typography>
            <Box sx={{ p: 2 }}>
              <Typography>Profile information will go here</Typography>
            </Box>
          </RoundedContainer>
        </div>

        <div className='space-y-6 md:col-span-2'>
          <RoundedContainer>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Guide Statistics
            </Typography>
            <Box>
              <Typography>Statistics information will go here</Typography>
            </Box>
          </RoundedContainer>
        </div>

        <div className='space-y-6 md:col-span-2 lg:col-span-2'>
          <Stack
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            mb='2rem'
          >
            <Typography variant='h6'>Guide Expeditions</Typography>
            {hasExpeditions && (guide?.expeditions?.length ?? 0) > 1 && (
              <SortOrder sortOrder={sortOrder} onSortChange={setSortOrder} />
            )}
          </Stack>
          <RoundedContainer sx={{ minHeight: { xs: '32rem', md: '48rem' } }}>
            <GuideExpeditions expeditions={sortedExpeditions} />
          </RoundedContainer>
        </div>
      </div>
    </>
  );
};

export default GuidePageContent;
