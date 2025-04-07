'use client';

import { Box, Stack } from '@mui/material';
import { FC } from 'react';
import { useGetExpeditionsQuery } from '@/entities/expedition/api';
import { routes } from '@/lib/config/routes';
import { notFound } from 'next/navigation';
import { handleRTKQueryError } from '@/utils/error-handler/error-handler';
import { Loader } from '@/shared/ui/core/loader/loader';
import { PageHeader } from '@/shared/ui/core/typography/page-header';
import { EmptyState } from '@/shared/ui/components/empty-state/empty-state';
import { ExpeditionList } from '@/widgets/expedition-list/ui/expedition-list';
import { SortExpeditions } from '@/features/sort-expeditions/sort-expeditions';

const PageContent: FC = () => {
  const {
    data: expeditions,
    isLoading: isGetExpeditionsLoading,
    isError: isGetExpeditionsError,
    error: expeditionsError,
  } = useGetExpeditionsQuery();

  if (isGetExpeditionsError) {
    handleRTKQueryError(expeditionsError);
  }

  if (!expeditions && !isGetExpeditionsLoading) {
    notFound();
  }

  return (
    <Stack height='100%' gap='2rem'>
      <PageHeader
        title='Expeditions'
        subtitle='Browse and manage your expedition catalog'
        buttonLabel='New expedition'
        href={routes.newExpedition}
      />
      {isGetExpeditionsLoading ? (
        <Box
          display='flex'
          justifyContent='center'
          height='100%'
          flex='1 1 100%'
        >
          <Loader />
        </Box>
      ) : expeditions?.length ? (
        <SortExpeditions expeditions={expeditions}>
          {(sortedExpeditions) => (
            <>
              <h2 className='sr-only'>Expeditions List</h2>
              <ExpeditionList expeditions={sortedExpeditions} />
            </>
          )}
        </SortExpeditions>
      ) : (
        <Stack height='100%' alignItems='center' justifyContent='center'>
          <EmptyState title='No Expeditions Found' />
        </Stack>
      )}
    </Stack>
  );
};

export default PageContent;
