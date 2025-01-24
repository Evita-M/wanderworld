'use client';

import { useEffect } from 'react';
import { Stack } from '@mui/material';
import { useGetGuidesQuery } from '@/entities/guide/api';
import { Loader } from '@/shared/ui/core/loader';
import { GuideList } from '@/entities/guide/ui/guide-list';

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
  ) : (
    guides && <GuideList guides={guides} />
  );
}
