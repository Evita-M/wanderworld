'use client';

import { Grid } from '@mui/material';
import { ExpeditionItem } from './expedition-item';
import { Expedition } from '@/shared/types/expedition';

interface ExpeditionListProps {
  expeditions: Expedition[];
}

export const ExpeditionList = ({ expeditions }: ExpeditionListProps) => {
  return (
    <Grid container spacing={4}>
      {expeditions.map(
        ({ id, name, startDate, endDate, languages, countries }) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={id}>
            <ExpeditionItem
              id={id}
              name={name}
              startDate={startDate}
              endDate={endDate}
              languages={languages}
              countries={countries}
            />
          </Grid>
        )
      )}
    </Grid>
  );
};
