'use client';

import { PageHeader } from '@/shared/ui/core/typography';
import { BackButton } from '@/shared/ui/core/button';
import { CreateGuide } from '@/features/guide/create/ui/create-guide';
import { useRouter } from 'next/navigation';


export default function PageContent() {
  const router = useRouter();

  const handleOnCancel = () => {
    router.back();
  };

  return (
    <>
      <PageHeader
        title='New guide'
        sx={{ mb: '4rem' }}
        prefix={<BackButton onClick={handleOnCancel} />}
      />
      <CreateGuide  />
    </>
  );
};

