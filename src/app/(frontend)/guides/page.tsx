import { Metadata } from 'next';
import PageContent from './PageContent';
import { PageContainer } from '@/components/core/PageContainer';
import { routes } from '@/routes/index';

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
