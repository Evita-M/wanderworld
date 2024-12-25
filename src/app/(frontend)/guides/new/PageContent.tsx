'use client';

import React from 'react';
import { GuideForm } from '@/modules/forms/GuideForm';
import { PageHeader } from '@/modules/page-header';
import { useRouter } from 'next/navigation';
import { routes } from '@/routes/index';
import { PageContainer } from '@/components/core/PageContainer';
import { BackButton } from '@/components/core/BackButton';

const PageContent = () => {
  const router = useRouter();
  const redirectToGuides = () => router.push(routes.guides);

  return (
    <PageContainer maxWidth='md'>
      <PageHeader
        title='New guide'
        sx={{ mb: '4rem' }}
        prefix={<BackButton onClick={redirectToGuides} />}
      />
      <GuideForm onSuccess={redirectToGuides} onCancel={redirectToGuides} />
    </PageContainer>
  );
};

export default PageContent;
