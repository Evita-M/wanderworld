import { formatPageTitle } from '@/shared/config/metadata';
import PageContent from './page-content';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: formatPageTitle('Edit Guide'),
  description:
    'Edit and update your travel guide with detailed information, activities, and recommendations.',
};

export default function EditGuidePage() {
  return <PageContent />;
}
