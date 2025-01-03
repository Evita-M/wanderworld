'use client';

import { GuideItem } from '@/modules/guide-item';
import { Stack } from '@mui/material';
import { Guide } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function GuideList({ guides }: { guides: Guide[] }) {
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
}
