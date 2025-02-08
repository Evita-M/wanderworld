import { Stack } from '@mui/material';
import { Loader } from '@/shared/ui/core/loader';
import { GuideList } from '@/entities/guide/ui/guide-list';
import { EmptyState } from '@/shared/ui/components/empty-state';
import { useGetGuidesQuery } from '../../api';

export function GuidesListContent() {
  const {data: guides, isLoading: isGetGuidesLoading} = useGetGuidesQuery();

  if (isGetGuidesLoading && !guides) {
    return (
      <Stack justifyContent="center" alignItems="center" height="100%">
        <Loader />
      </Stack>
    );
  }

  if (!guides?.length) {
    return <EmptyState title="No guides found" />;
  }

  return (
    <section className="h-full">
      <h2 className="sr-only">
        Guides List
      </h2>
      <GuideList guides={guides} />
    </section>
  );
}
