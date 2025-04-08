'use client';

import { Grid, Stack } from '@mui/material';
import { FC } from 'react';
import { GuideItem } from './guide-item';
import { Guide } from '@/shared/types/guide';

interface GuideListProps {
  guides: Guide[];
}

export const GuideList: FC<GuideListProps> = ({ guides }) => {
  return (
    <Stack
      gap={2}
      sx={{
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <Grid container spacing={4}>
        {guides.map(
          ({
            expeditions,
            lastName,
            firstName,
            languages,
            description,
            avatar,
            id,
            ...guide
          }) => (
            <Grid item xs={12} md={4} lg={3} key={id}>
              <GuideItem
                id={id}
                name={`${firstName} ${lastName}`}
                avatarSrc={avatar ?? ''}
                description={description ?? undefined}
                languages={languages}
              />
            </Grid>
          )
        )}
      </Grid>
    </Stack>
  );
};
