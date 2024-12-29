import { Metadata } from 'next';
import PageContent from './PageContent';
import { PageContainer } from '@/components/core/PageContainer';

export const metadata: Metadata = {
  title: 'Guides',
};

export default function GuidesPage() {
  return (
    <PageContainer>
      <PageContent />
    </PageContainer>
  );
}
