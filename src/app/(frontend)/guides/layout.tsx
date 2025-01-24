'use client';

import { Stack } from '@mui/material';
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { PageContainer } from '@/shared/ui/core/layout';

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
      {/* <Stack height='100%'> */}
      {children}
      <Stack
        alignItems='center'
        justifyContent='center'
        sx={{
          height: 'calc(100% - 2rem)',
          overflow: 'hidden',
        }}
        position='relative'
      >
        <Stack
          direction='row'
          flex={1}
          spacing={3}
          overflow='hidden'
          width='100%'
          height='100%'
          mt='4rem'
        >
          <Stack spacing={3} width='40%' pb='0.6rem' sx={{ overflowY: 'auto' }}>
            {list}
          </Stack>
          <Stack width='60%' justifyContent='center' flex={1} overflow='auto'>
            {guide}
          </Stack>
        </Stack>
      </Stack>
      {/* </Stack> */}
    </PageContainer>
  );
}
