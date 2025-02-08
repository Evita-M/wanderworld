'use client';

import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { GuideItem } from '../guide-item';
import { Guide } from '../../model';


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
