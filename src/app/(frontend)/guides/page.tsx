'use client';
import { PageHeader } from '@/modules/page-header';
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
