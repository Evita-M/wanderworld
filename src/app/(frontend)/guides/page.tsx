import { Metadata } from 'next';
import PageContent from './PageContent';
import { PageContainer } from '@/components/core/PageContainer';
import { routes } from '@/routes/index';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Guides',
};

export default function GuidesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
