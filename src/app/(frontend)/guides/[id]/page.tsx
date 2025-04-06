import { Metadata } from 'next';
import GuidePageContent from './page-content';
import { PageContainer } from '@/shared/ui/core/layout/page-container';

export const metadata: Metadata = {
  title: 'Guide Detail',
  description: 'Find out more about the guide',
};

export default function GuidePage() {
  return (
    <PageContainer>
      <GuidePageContent />
    </PageContainer>
  );
}
