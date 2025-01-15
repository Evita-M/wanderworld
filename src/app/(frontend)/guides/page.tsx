'use client';
import { PageHeader } from '@/ui/core/typography';
import { routes } from '@/routes/index';

export default function GuidesPage() {
  return (
    <PageHeader
      title='Guides'
      buttonLabel='Add new guide'
      href={routes.newGuide}
    />
  );
}
