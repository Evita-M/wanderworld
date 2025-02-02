'use client';

import { useGetGuideQuery } from '@/entities/guide/api';
import { GuideDetail } from '@/entities/guide/ui/guide-details';
import { Loader } from '@/shared/ui/core/loader';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function GuidePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const {
    data: guide,
    isLoading: isGetGuideLoading,
    isError: isGetGuideError,
  } = useGetGuideQuery(id, {
    skip: !id,
  });

  useEffect(() => {
    if (isGetGuideError) {
      throw new Error('Guide failed to load');
    }
  }, [isGetGuideError, router]);

  return isGetGuideLoading ? (
    <Loader />
  ) : (
    guide && <><h2 className="sr-only">Guide Detail</h2><GuideDetail guide={guide} /></>
  );
}
