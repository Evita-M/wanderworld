'use client';

import { Loader } from '@/components/core/Loader';
import { Stack } from '@mui/material';

export default function GuideLoading() {
  return (
    <Stack alignItems='center' justifyContent='center' height='100%'>
      <Loader />
    </Stack>
  );
}
