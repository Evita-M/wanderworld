'use client';

import { useGetGuideQuery } from '@/entities/guide/api';
import { GuideDetail } from '@/entities/guide/ui/guide-details';
import { Loader } from '@/shared/ui/core/loader';
import { handleRTKQueryError } from '@/utils/errorHandler';
import { notFound, useParams, useRouter } from 'next/navigation';

const GuidePage = () => {
  const params = useParams();
  const id = params?.id as string;

  const {
    data: guide,
    isLoading: isGetGuideLoading,
    error: guideError,
    isError: isGetGuideError,
  } = useGetGuideQuery(id, {
    skip: !id,
  });

  if (isGetGuideError) {
    handleRTKQueryError(guideError);
  }

  if (!guide && !isGetGuideLoading) {
    notFound();
  }

  return isGetGuideLoading ? (
    <Loader />
  ) : (
    guide && (
      <>
        <h2 className='sr-only'>Guide Detail</h2>
        <GuideDetail guide={guide} />
      </>
    )
  );
};

export default GuidePage;
