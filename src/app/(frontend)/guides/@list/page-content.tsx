'use client';

import { useGetGuidesQuery } from '@/entities/guide/api';
import { GuidesListContent } from '@/entities/guide/ui/guide-list-content/guide-list-content';
import { EmptyState } from '@/shared/ui/components/empty-state/empty-state';
import { handleRTKQueryError } from '@/utils/error-handler/error-handler';
import { Stack } from '@mui/material';
import { notFound } from 'next/navigation';

const PageContent = () => {
  const {
    data: guides,
    isLoading: isGetGuidesLoading,
    error: guidesError,
    isError: isGetGuidesError,
  } = useGetGuidesQuery();

  if (isGetGuidesError) {
    handleRTKQueryError(guidesError);
  }

  if (!guides && !isGetGuidesLoading) {
    notFound();
  }
  if ((!guides || guides.length === 0) && !isGetGuidesLoading) {
    return (
      <Stack
        sx={{
          position: 'absolute',
          inset: 0,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <EmptyState title='No Guides Found' />
      </Stack>
    );
  }
  return <GuidesListContent guides={guides ?? []} />;
};

export default PageContent;
