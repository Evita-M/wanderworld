import PageContent from './page-content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '%s | My Site',
  description:
    'Edit and update your travel guide with detailed information, activities, and recommendations.',
};

const EditGuidePage = () => {
  return <PageContent />;
};

export default EditGuidePage;
