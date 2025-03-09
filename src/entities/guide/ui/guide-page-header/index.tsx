import { routes } from '@/lib/config/routes';
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
