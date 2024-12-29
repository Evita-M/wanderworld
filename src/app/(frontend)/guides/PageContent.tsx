'use client';

import { FC, useEffect } from 'react';
import { Stack } from '@mui/material';
import { useGetGuidesQuery } from '@/redux/api/guideApi';
import { GuideItem } from '@/modules/guide-item';
import { useRouter, useSearchParams } from 'next/navigation';
import { GuideDetail } from '@/modules/guide-details';
import { Guide } from '@prisma/client';
import { PageHeader } from '@/modules/page-header';
import { Loader } from '@/components/core/Loader';
import { EmptyState } from '@/components/core/EmptyState';
import { routes } from '@/routes/index';

const Guides: FC = () => {
  const { data: guides, isLoading: isGetGuidesLoading } = useGetGuidesQuery();
  const router = useRouter();
  const searchParams = useSearchParams();
  const guideId = searchParams.get('guideId');

  useEffect(() => {
    if (guides?.length && !guideId) {
      const firstGuide = guides[0];
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('guideId', firstGuide.id);
      router.push(`${routes.guides}?${newParams.toString()}`, {
        scroll: false,
      });
    }
  }, [guides, guideId, router, searchParams]);

  const handleGuideClick = (guide: Guide) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('guideId', guide.id);
    router.push(`${routes.guides}?${newParams.toString()}`);
  };

  const selectedGuide = guides?.find((guide) => guide.id === guideId) || null;

  return (
    <Stack height='100%' gap='3rem'>
      <PageHeader
        title='Guides'
        buttonLabel='Add new guide'
        href={routes.newGuide}
      />
      <Stack
        alignItems='center'
        justifyContent='center'
        sx={{
          height: 'calc(100vh - 24rem)',
          overflow: 'hidden',
        }}
      >
        {isGetGuidesLoading ? (
          <Loader />
        ) : guides?.length ? (
          <Stack direction='row' flex={1} spacing={3} overflow='hidden'>
            <Stack
              spacing={3}
              width='40%'
              pb='0.6rem'
              sx={{ overflowY: 'auto' }}
            >
              {guides.map((guide) => (
                <GuideItem
                  key={guide.id}
                  guide={guide}
                  onClick={() => handleGuideClick(guide)}
                  isSelected={selectedGuide?.id === guide.id}
                />
              ))}
            </Stack>
            <Stack flex={1} overflow='auto'>
              {selectedGuide && (
                <GuideDetail guide={selectedGuide} guides={guides || []} />
              )}
            </Stack>
          </Stack>
        ) : (
          <Stack height='100%'>
            <EmptyState
              title='No Guides Found'
              description='Get started by adding your first guide'
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Guides;
