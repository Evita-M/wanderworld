import { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Expeditions',
  description: 'Wander the World',
};

const ExpeditionsPage = () => {
  return <PageContent />;
};

export default ExpeditionsPage;
