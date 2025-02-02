'use client';

import { Loader } from '@/shared/ui/core/loader';
import { useGetGuidesQuery } from '@/entities/guide/api';
import { EmptyState } from '@/shared/ui/components/empty-state';
import { GuideList } from '@/entities/guide/ui/guide-list';

export default function GuidesListPage() {
  const { data: guides, isLoading } = useGetGuidesQuery();

  if (isLoading) {
    return <Loader />;
  }

  return guides?.length ? (
    <><h2 className="sr-only">Guides List</h2><GuideList guides={guides} /></>
  ) : (
    <EmptyState title="No guides found" />
  );
}
