'use client';
import { EmptyState } from '@/ui/components/empty-state';
import { useGetGuidesQuery } from '@/redux/api/guideApi';
import { borderRadius } from '@/styles/border-radius';
import { Stack } from '@mui/material';
import { grey } from '@mui/material/colors';

export default function GuidePage() {
  const { data: guides, isLoading: isGetGuidesLoading } = useGetGuidesQuery();
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
              alt: 'A woman hiking in the mountains',
              width: 350,
              height: 350,
            }}
          />
        </Stack>
      ) : null}
    </>
  );
}
