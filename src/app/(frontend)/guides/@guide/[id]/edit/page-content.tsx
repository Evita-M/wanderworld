'use client';
import { useGetGuideQuery } from '@/entities/guide/api';
import { GuideCommon } from '@/entities/guide/model';
import { EditGuide } from '@/features/guide/edit';
import { Loader } from '@/shared/ui/core/loader';
import { handleRTKQueryError } from '@/utils/errorHandler';
import { Stack, Typography } from '@mui/material';
import { notFound, useParams } from 'next/navigation';

const PageContent = () => {
  const { id } = useParams();
  const {
    data: guide,
    isLoading: isGetGuideLoading,
    error: guideError,
    isError: isGetGuideError,
  } = useGetGuideQuery(id as string);

  if (isGetGuideLoading) {
    return <Loader />;
  }

  if (isGetGuideError) {
    handleRTKQueryError(guideError);
  }

  if (!guide && !isGetGuideLoading) {
    notFound();
  }

  return (
    <Stack height='100%'>
      <Typography variant='h3' mb='4rem'>
        Edit Guide
      </Typography>
      <EditGuide guide={guide} />
    </Stack>
  );
};

export default PageContent;
