'use client';

import { Box, Grid, Stack } from '@mui/material';
import React, { FC } from 'react';
import { useGetExpeditionsQuery } from '@/redux/api/expeditionApi';
import { ExpeditionItem } from '@/modules/expedition-item';
import { PageHeader } from '@/modules/page-header';
import { routes } from '@/routes/index';
import { Loader } from '@/components/core/Loader';
import { EmptyState } from '@/components/core/EmptyState';

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
