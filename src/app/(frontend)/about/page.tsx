import { Metadata } from 'next';
import PageContent from './page-content';
import { PageContainer } from '@/shared/ui/core/layout';
import { formatPageTitle } from '@/shared/config/metadata';


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
