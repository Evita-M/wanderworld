'use client';

import { GuideList } from '@/modules/guide-list';
import { useGetGuidesQuery } from '@/redux/api/guideApi';
import { Loader } from '@/components/core/Loader';

export default function List() {
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
