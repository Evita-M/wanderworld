'use client';

import { GuideList } from '@/modules/guide-list';
import { useGetGuidesQuery } from '@/redux/api/guideApi';
import { Loader } from '@/ui/core/loader';
import { useEffect } from 'react';
import { Stack } from '@mui/material';

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
