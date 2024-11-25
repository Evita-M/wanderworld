import { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'New Guide',
  description: 'Wander the World',
};

const NewGuidePage = () => {
  return <PageContent />;
};

export default NewGuidePage;
