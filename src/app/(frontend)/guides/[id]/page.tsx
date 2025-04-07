import { Metadata } from 'next';
import { PageContainer } from '@/shared/ui/core/layout/page-container';
import PageContent from './page-content';

export const metadata: Metadata = {
  title: 'Guide Detail',
  description: 'Find out more about the guide',
};

export default function GuidePage() {
  return (
    <PageContainer>
      <PageContent />
    </PageContainer>
  );
}
