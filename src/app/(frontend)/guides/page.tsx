'use client';

import { routes } from '@/routes/index';
import { PageHeader } from '@/shared/ui/core/typography';

export default function GuidesPage() {
  return (
    <PageHeader
      title='Guides'
      buttonLabel='Add new guide'
      href={routes.newGuide}
    />
  );
}
