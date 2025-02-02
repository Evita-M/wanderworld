'use client';

import { useGetGuidesQuery } from '@/entities/guide/api';
import { EmptyState } from '@/shared/ui/components/empty-state';
import { borderRadius } from '@/styles/border-radius';
import { Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Loader } from '@/shared/ui/core/loader';

export default function GuidePage() {
  const { data: guides, isLoading } = useGetGuidesQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {guides?.length ? (
        <Stack
          justifyContent='center'
          alignItems='center'
          height='100%'
          border={`1px solid ${grey[300]}`}
          borderRadius={borderRadius.large}
        >
          <EmptyState
            title='Select a guide to view details'
            img={{
              src: '/hiking.png',
              alt: 'A woman hiking in the rocky mountains',
              width: 350,
              height: 350,
            }}
          />
        </Stack>
      ) : null}
    </>
  );
}
