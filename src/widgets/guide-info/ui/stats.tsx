import { Stack, Typography, useTheme } from '@mui/material';
import { FC } from 'react';

interface DataItem {
  label: string;
  count: number;
}

interface StatsProps {
  data: DataItem[];
}

export const Stats: FC<StatsProps> = ({ data }) => {
  const theme = useTheme();
  return (
    <Stack direction='row' gap='1.6rem' width='100%'>
      {data.map((dataItem: DataItem, index: number) => (
        <Stack
          key={index}
          width='100%'
          justifyContent='center'
          alignItems='center'
          p='1.4rem'
          gap='0.8rem'
          sx={{
            borderRight:
              index < data.length - 1
                ? `2px solid ${theme.palette.divider}`
                : 'none',
          }}
        >
          <Typography variant='h6' component='p'>
            {dataItem.count}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {dataItem.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};
