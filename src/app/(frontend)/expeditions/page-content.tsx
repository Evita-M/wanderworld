'use client';

import { Box, Grid, Stack } from '@mui/material';
import { FC } from 'react';
import { useGetExpeditionsQuery } from '@/redux/api/expeditionApi';
import { routes } from '@/routes/index';
import { Loader } from '@/shared/ui/core/loader';
import { PageHeader } from '@/shared/ui/core/typography';
import { ExpeditionItem } from '@/entities/expedition/ui/expedition-item';
import { EmptyState } from '@/shared/ui/components/empty-state';


const PageContent: FC = () => {
  const { data: expeditions, isLoading: isExpeditionsLoading } =
    useGetExpeditionsQuery();

  return (
    <Stack height='100%' gap='3rem'>
      <PageHeader
        title='Expeditions'
        buttonLabel='Add new expedition'
        href={routes.newExpedition}
      />
      {isExpeditionsLoading ? (
        <Box
          display='flex'
          justifyContent='center'
          height='100%'
          flex='1 1 100%'
        >
          <Loader />
        </Box>
      ) : expeditions?.length ? (
        <Grid container spacing={3}>
          {expeditions?.map((expedition) => (
            <Grid item xs={12} sm={6} md={4} key={expedition.id}>
              <ExpeditionItem expedition={expedition} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack height='100%'>
          <EmptyState title='No Expeditions Found' />
        </Stack>
      )}
    </Stack>
  );
};

export default PageContent;
