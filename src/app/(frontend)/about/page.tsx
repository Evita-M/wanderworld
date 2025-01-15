import { Metadata } from 'next';
import { formatPageTitle } from '@/config/metadata';
import PageContent from './page-content';
import { PageContainer } from '@/ui/core/layout';

export const metadata: Metadata = {
  title: formatPageTitle('About Us'),
  description:
    'Learn about our mission and our commitment to authentic travel experiences.',
};

const AboutPage = () => {
  return (
    <PageContainer>
      <PageContent />
    </PageContainer>
  );
};

export default AboutPage;
