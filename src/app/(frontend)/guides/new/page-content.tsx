'use client';

import { PageHeader } from '@/shared/ui/core/typography/page-header';
import { BackButton } from '@/shared/ui/core/button/back-button';
import { CreateGuide } from '@/features/create-guide/create-guide';

const PageContent = () => {
  return (
    <>
      <PageHeader
        title='New guide'
        sx={{ mb: '4rem' }}
        prefix={<BackButton />}
      />
      <CreateGuide />
    </>
  );
};

export default PageContent;
