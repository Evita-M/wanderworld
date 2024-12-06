'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { routes } from '@/routes/index';
import { useGetExpeditionsQuery } from '@/redux/api/expeditionApi';
import { ExpeditionItem } from '@/modules/expedition-item';

const PageContent: FC = () => {
  const { data: expeditions, isLoading: isExpeditionsLoading } =
    useGetExpeditionsQuery();
  return (
    <Box p='1.6rem'>
      <Stack
        justifyContent='space-between'
        direction='row'
        alignItems='center'
        mb={6}
      >
        <Typography variant='h1'>Expeditions</Typography>
        <Link href={routes.newExpedition}>
          <Button
            size='large'
            variant='contained'
            color='success'
            startIcon={<AddIcon />}
          >
            Add new expedition
          </Button>
        </Link>
      </Stack>
      <Stack flexDirection='row' gap='3rem' flexWrap='wrap'>
        {expeditions?.map((expedition) => (
          <ExpeditionItem key={expedition.id} expedition={expedition} />
        ))}
      </Stack>
    </Box>
  );
};

export default PageContent;
