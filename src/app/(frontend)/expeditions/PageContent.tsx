'use client';

import { Box, Stack } from '@mui/material';
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
        <Stack direction='row' gap='3rem' flexWrap='wrap'>
          {expeditions?.map((expedition) => (
            <ExpeditionItem key={expedition.id} expedition={expedition} />
          ))}
        </Stack>
      ) : (
        <Stack height='100%'>
          <EmptyState title='No Expeditions Found' />
        </Stack>
      )}
    </Stack>
  );
};

export default PageContent;
