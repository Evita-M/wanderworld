import { routes } from '@/lib/config/routes';
import { PageHeader } from '@/shared/ui/core/typography/page-header';

export function GuidesPageHeader() {
  return (
    <PageHeader
      title='Guides'
      subtitle='Browse and manage your expedition guides'
      buttonLabel='Add new guide'
      href={routes.newGuide}
    />
  );
}
