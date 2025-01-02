import { PageContainer } from '@/components/core/PageContainer';
import PageContent from './PageContent';
import { Metadata } from 'next';
import { formatPageTitle } from '@/config/metadata';

export const metadata: Metadata = {
  title: formatPageTitle('Edit Guide'),
  description:
    'Edit and update your travel guide with detailed information, activities, and recommendations.',
};

export default function EditGuidePage() {
  return (
    <PageContainer maxWidth='md'>
      <PageContent />
    </PageContainer>
  );
}
