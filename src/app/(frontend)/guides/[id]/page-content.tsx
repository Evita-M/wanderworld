'use client';
import { useGetGuideQuery } from '@/entities/guide/api';
import { GuideActions } from '@/features/guide-actions/guide-actions';
import { SortExpeditions } from '@/features/sort-expeditions/sort-expeditions';
import { RoundedContainer } from '@/shared/ui/components/rounded-container/rounded-container';
import { BackButton } from '@/shared/ui/core/button/back-button';
import { Loader } from '@/shared/ui/core/loader/loader';
import { PageHeader } from '@/shared/ui/core/typography/page-header';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { handleRTKQueryError } from '@/utils/error-handler/error-handler';
import { GuideDetail } from '@/widgets/guide-detail/ui/guide-detail';
import { GuideExpeditions } from '@/widgets/guide-expeditions/ui/guide-expeditions';
import { Box, Stack, Typography } from '@mui/material';
import { notFound, useParams } from 'next/navigation';
import { FeatureList } from '@/widgets/feature-list/ui/feature-list';
import { format } from 'date-fns';
import { FC } from 'react';
import { LanguagesList } from '@/shared/ui/modules/languages/languages-list';

const PageContent: FC = () => {
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

  const features = [
    {
      icon: <LanguageOutlinedIcon />,
      title: 'Expeditions',
      text: guide?.expeditions?.length ?? 0,
    },
    {
      icon: <LanguageOutlinedIcon />,
      title: 'Languages',
      text: guide?.languages?.length ?? 0,
    },
    {
      icon: <LanguageOutlinedIcon />,
      title: 'Joined',
      text: guide?.createdAt
        ? format(new Date(guide.createdAt), 'dd MMMM yyyy')
        : 'N/A',
    },
  ];

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
          <Typography variant='h6' component='h2' sx={{ pb: '1.2rem' }}>
            Languages
          </Typography>
          <RoundedContainer sx={{ p: 0, minHeight: '20rem' }}>
            <Box sx={{ p: 2 }}>
              {guide?.languages && (
                <LanguagesList languages={guide.languages} />
              )}
            </Box>
          </RoundedContainer>
        </div>

        <div className='space-y-6 md:col-span-2'>
          <Typography variant='h6' component='h2' sx={{ mb: '1.2rem' }}>
            Statistics
          </Typography>
          <FeatureList items={features} />
        </div>
        <div className='space-y-6 md:col-span-2 lg:col-span-2'>
          <Box>
            {guide?.expeditions && (
              <SortExpeditions
                title={
                  <Typography variant='h6' component='h2'>
                    Guide Expeditions
                  </Typography>
                }
                expeditions={guide?.expeditions}
              >
                {(sortedExpeditions) => (
                  <RoundedContainer sx={{ mt: '1.2rem', minHeight: '20rem' }}>
                    {sortedExpeditions.length ? (
                      <GuideExpeditions expeditions={sortedExpeditions} />
                    ) : (
                      <Typography>No expeditions found</Typography>
                    )}
                  </RoundedContainer>
                )}
              </SortExpeditions>
            )}
          </Box>
        </div>
      </div>
    </>
  );
};

export default PageContent;
