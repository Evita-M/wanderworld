'use client';

import { GuideDetail } from '@/modules/guide-details';
import { useGetGuideQuery } from '@/redux/api/guideApi';
import { Loader } from '@/components/core/Loader';
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

  return guide && <GuideDetail guide={guide} />;
}
