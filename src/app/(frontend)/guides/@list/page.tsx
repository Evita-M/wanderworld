'use client';


import { useEffect } from 'react';
import { Button, Stack } from '@mui/material';
import Link from 'next/link';
import { routes } from '@/routes/index';
import { Loader } from '@/shared/ui/core/loader';
import { GuideList } from '@/entities/guide/ui/guide-list';
import { useGetGuidesQuery } from '@/entities/guide/api';
import { EmptyState } from '@/shared/ui/components/empty-state';


export default function List() {
  const {
    data: guides,
    isLoading: isGetGuidesLoading,
    isError: isGetGuidesError,
  } = useGetGuidesQuery();

  useEffect(() => {
    if (isGetGuidesError) {
      throw new Error('Guides failed to load');
    }
  }, [isGetGuidesError]);

  return isGetGuidesLoading ? (
    <Stack justifyContent='center' height='100%'>
      <Loader />
    </Stack>
  ) : guides?.length ? (
    <GuideList guides={guides} />
  ) : (
    <Stack
      alignItems='center'
      justifyContent='center'
      height='100%'
      position='absolute'
      top='0'
      left='0'
      right='0'
      bottom='0'
    >
      <EmptyState
        title='No Guides Found'
        description='Don’t worry, every great journey starts with creating a leader'
        img={{
          src: '/hiking.png',
          alt: 'A woman hiking in the mountains',
          width: 350,
          height: 350,
        }}
      />
      <Button
        variant='contained'
        color='primary'
        LinkComponent={Link}
        href={routes.newGuide}
        sx={{ mt: '3.2rem' }}
      >
        Create a new guide
      </Button>
    </Stack>
  );
}
