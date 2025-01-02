'use client';
import { PageContainer } from '@/components/core/PageContainer';
import { Stack } from '@mui/material';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function GuidesLayout({
  children,
  list,
  guide,
}: {
  children: ReactNode;
  list: ReactNode;
  guide: ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/guides/new') {
    return <>{children}</>;
  }

  return (
    <PageContainer>
      <Stack height='100%' rowGap='4rem'>
        {children}
        <Stack
          alignItems='center'
          justifyContent='center'
          sx={{
            height: 'calc(100vh - 24rem)',
            overflow: 'hidden',
          }}
        >
          <Stack
            direction='row'
            flex={1}
            spacing={3}
            overflow='hidden'
            height='100%'
          >
            <Stack
              spacing={3}
              width='40%'
              pb='0.6rem'
              sx={{ overflowY: 'auto' }}
            >
              {list}
            </Stack>
            <Stack width='60%' flex={1} overflow='auto'>
              {guide}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </PageContainer>
  );
}
