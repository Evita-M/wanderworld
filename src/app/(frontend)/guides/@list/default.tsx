'use client';
import { Loader } from '@/components/core/Loader';
import { GuideList } from '@/modules/guide-list';
import { useGetGuidesQuery } from '@/redux/api/guideApi';

export default function DefaultListPage() {
  const {
    data: guides,
    isLoading: isGetGuidesLoading,
    isError: isGetGuidesError,
  } = useGetGuidesQuery();

  return isGetGuidesLoading ? (
    <Loader />
  ) : (
    guides && <GuideList guides={guides} />
  );
}
