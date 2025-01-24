import { Metadata } from 'next';
import PageContent from './page-content';
import { formatPageTitle } from '@/shared/config/metadata';
import { PageContainer } from '@/shared/ui/core/layout';

export const metadata: Metadata = {
  title: formatPageTitle('Expedition Detail'),
  description:
    'Explore the details of this amazing expedition, including activities, locations, and more.',
};

export default function ExpeditionPage() {
  return (
    <PageContainer>
      <PageContent />
    </PageContainer>
  );
}
