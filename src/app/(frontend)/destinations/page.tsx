import { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Destinations',
  description: 'Wander the World',
};

const Destinations = () => {
  return <PageContent />;
};

export default Destinations;
