'use client';

import { Stack } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import { FC } from 'react';
import { GuideItem } from '../guide-item';
import { Guide } from '../../model';

interface GuideListProps {
  guides: Guide[];
}

export const GuideList: FC<GuideListProps> = ({ guides }) => {
  const router = useRouter();
  const params = useParams();
  const selectedGuideId = params?.id as string;

  const handleGuideClick = (guide: Guide) => {
    router.push(`/guides/${guide.id}`);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {guides.map((guide) => (
        <GuideItem
          key={guide.id}
          guide={guide}
          onClick={() => handleGuideClick(guide)}
          isSelected={selectedGuideId === guide.id}
        />
      ))}
    </Stack>
  );
};
