import { PageHeader } from '@/modules/page-header';
import { routes } from '@/routes/index';

export default function DefaultGuidesPage() {
  return (
    <PageHeader
      title='Guides'
      buttonLabel='Add new guide'
      href={routes.newGuide}
    />
  );
}
