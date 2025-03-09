'use client';
import { PageHeader } from '@/shared/ui/core/typography';
import { BackButton } from '@/shared/ui/core/button';
import { useRouter } from 'next/navigation';
import { CreateGuide } from '@/features/guide/create';

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
