'use client';

import { PageHeader } from '@/shared/ui/core/typography/page-header';
import { BackButton } from '@/shared/ui/core/button/back-button';
import { useRouter } from 'next/navigation';
import { CreateGuide } from '@/features/create-guide/create-guide';

const PageContent = () => {
  const router = useRouter();

  return (
    <>
      <PageHeader
        title='New guide'
        sx={{ mb: '4rem' }}
        prefix={<BackButton onClick={() => router.back()} />}
      />
      <CreateGuide />
    </>
  );
};

export default PageContent;
