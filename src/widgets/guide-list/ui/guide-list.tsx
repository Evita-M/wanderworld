'use client';

import { Stack } from '@mui/material';
import { FC } from 'react';
import { GuideItem } from './guide-item';
import { Guide } from '@/shared/types/guide';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/config/routes';
interface GuideListProps {
  guides: Guide[];
}

export const GuideList: FC<GuideListProps> = ({ guides }) => {
  const router = useRouter();
  return (
    <Stack
      gap={2}
      sx={{
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {guides.map(({ expeditions, languages, id, ...guide }) => (
        <GuideItem
          key={id}
          email={guide.email}
          fullName={`${guide.firstName} ${guide.lastName}`}
          avatarSrc={guide.avatar ?? ''}
          languages={languages}
          onClick={() => router.push(`/${routes.guides}/${id}`)}
          id={id}
        />
      ))}
    </Stack>
  );
};
