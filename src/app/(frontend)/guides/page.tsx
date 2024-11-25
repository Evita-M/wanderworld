import { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Guides',
  description: 'See our professional guides',
};

const Guides = () => {
  return <PageContent />;
};

export default Guides;
