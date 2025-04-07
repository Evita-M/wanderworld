'use client';
import { EditGuide } from '@/features/edit-guide/edit-guide';
import { BackButton } from '@/shared/ui/core/button/back-button';
import { PageHeader } from '@/shared/ui/core/typography/page-header';
import { Stack } from '@mui/material';

const PageContent = () => {
  return (
    <Stack height='100%' gap='4rem'>
      <PageHeader title='Edit Guide' prefix={<BackButton />} />
      <EditGuide />
    </Stack>
  );
};

export default PageContent;
