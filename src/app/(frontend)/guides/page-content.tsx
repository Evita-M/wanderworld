'use client';

import { useGetGuidesQuery } from '@/entities/guide/api';
import { routes } from '@/lib/config/routes';
import { EmptyState } from '@/shared/ui/components/empty-state/empty-state';
import { Loader } from '@/shared/ui/core/loader/loader';
import { PageHeader } from '@/shared/ui/core/typography/page-header';
import { handleRTKQueryError } from '@/utils/error-handler/error-handler';
import { GuideList } from '@/widgets/guide-list/ui/guide-list';
import { Box, Stack } from '@mui/material';
import { notFound } from 'next/navigation';

const PageContent = () => {
  const {
    data: guides,
    isLoading: isGetGuidesLoading,
    error: guidesError,
    isError: isGetGuidesError,
  } = useGetGuidesQuery();

  if (isGetGuidesError) {
    handleRTKQueryError(guidesError);
  }

  if (!guides && !isGetGuidesLoading) {
    notFound();
  }

  return (
    <Stack height='100%' gap='8rem'>
      <PageHeader
        title='Guides'
        subtitle='Browse and manage your guides'
        buttonLabel='New guide'
        href={routes.newGuide}
      />
      {isGetGuidesLoading ? (
        <Box
          display='flex'
          justifyContent='center'
          height='100%'
          flex='1 1 100%'
        >
          <Loader />
        </Box>
      ) : guides?.length ? (
        <>
          <h2 className='sr-only'>Guides List</h2>
          <GuideList guides={guides} />
        </>
      ) : (
        <Stack height='100%' alignItems='center' justifyContent='center'>
          <EmptyState title='No Guides Found' />
        </Stack>
      )}
    </Stack>
  );
};

export default PageContent;
