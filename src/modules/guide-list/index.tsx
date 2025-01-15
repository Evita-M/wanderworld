'use client';

import { GuideItem } from '@/modules/guide-item';
import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { Guide } from '@/types/guide';

interface GuideListProps {
  guides: Guide[];
}

export const GuideList: FC<GuideListProps> = ({ guides }) => {
  const router = useRouter();
  const [selectedGuideId, setSelectedGuideId] = useState<string | undefined>(
    undefined
  );

  const handleGuideClick = (guide: Guide) => {
    setSelectedGuideId(guide.id);
    router.push(`/guides/${guide.id}`);
  };

  return (
    <Stack spacing={2}>
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
