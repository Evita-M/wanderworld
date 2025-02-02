import { routes } from '@/routes/index';
import { PageHeader } from '@/shared/ui/core/typography';

export function GuidesPageHeader() {
  return (
    <PageHeader
      title='Guides'
      buttonLabel='Add new guide'
      href={routes.newGuide}
    />
  );
}
