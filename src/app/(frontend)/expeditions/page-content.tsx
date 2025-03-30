'use client';

import { Box, Grid, Stack } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import { useGetExpeditionsQuery } from '@/entities/expedition/api';
import { routes } from '@/lib/config/routes';
import { sortByDate } from '@/utils/sort-by-date';
import { notFound } from 'next/navigation';
import { handleRTKQueryError } from '@/utils/error-handler/error-handler';
import { Loader } from '@/shared/ui/core/loader/loader';
import { SortOrder } from '@/features/sort-order/sort-order';
import { ExpeditionItem } from '@/entities/expedition/ui/expedition-item/expedition-item';
import { PageHeader } from '@/shared/ui/core/typography/page-header';
import { EmptyState } from '@/shared/ui/components/empty-state/empty-state';

const PageContent: FC = () => {
  const {
    data: expeditions,
    isLoading: isGetExpeditionsLoading,
    isError: isGetExpeditionsError,
    error: expeditionsError,
  } = useGetExpeditionsQuery();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedExpeditions = useMemo(() => {
    if (!expeditions) return [];
    return sortByDate([...expeditions], 'startDate', sortOrder);
  }, [expeditions, sortOrder]);

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
        <>
          <Box alignSelf='flex-end'>
            <SortOrder sortOrder={sortOrder} onSortChange={setSortOrder} />
          </Box>
          <h2 className='sr-only'>Expeditions List</h2>
          <Grid container spacing={3}>
            {sortedExpeditions?.map((expedition) => (
              <Grid item xs={12} sm={6} md={4} key={expedition.id}>
                <ExpeditionItem expedition={expedition} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Stack height='100%' alignItems='center' justifyContent='center'>
          <EmptyState title='No Expeditions Found' />
        </Stack>
      )}
    </Stack>
  );
};

export default PageContent;
