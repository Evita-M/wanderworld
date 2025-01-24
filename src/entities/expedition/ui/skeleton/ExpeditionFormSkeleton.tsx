import { FC } from 'react';
import { Grid, Stack, Skeleton, Typography } from '@mui/material';

export const ExpeditionFormSkeleton: FC = () => {
  return (
    <Stack spacing={3}>
      <Grid container spacing={3} rowSpacing={5}>
        <Grid item xs={6}>
          <Skeleton variant='rectangular' height={56} />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant='rectangular' height={56} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant='rectangular' height={56} />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant='rectangular' height={56} />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant='rectangular' height={56} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant='rectangular' height={56} />
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            <Skeleton variant='text' width={100} />
            <Skeleton variant='rectangular' height={36} />
          </Stack>
        </Grid>
        <Grid item xs={6} alignSelf='flex-end'>
          <Skeleton variant='rectangular' height={56} />
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Skeleton variant='text' width={100} />
            <Grid container spacing={2}>
              {[...Array(24)].map((_, index) => (
                <Grid item xs={4} key={index}>
                  <Skeleton variant='rectangular' height={32} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Skeleton variant='text' width={100} />
            <Skeleton variant='rectangular' height={200} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack
            maxWidth='50rem'
            m='0 auto'
            spacing={3}
            direction='row'
            justifyContent='center'
          >
            <Skeleton variant='rectangular' width='100%' height={42} />
            <Skeleton variant='rectangular' width='100%' height={42} />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
