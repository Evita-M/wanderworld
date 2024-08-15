import { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Welcome',
  description: 'An amazing app about marvel characters',
};

const Dashboard = () => {
  return <PageContent />;
};

export default Dashboard;
