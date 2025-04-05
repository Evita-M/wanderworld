import { FC } from 'react';
import { Stack, SxProps, Typography, useTheme } from '@mui/material';
import { DateRange as DateRangeIcon } from '@mui/icons-material';
import { format } from 'date-fns';

interface DateRangeProps {
  startDate: Date | string;
  endDate: Date | string;
  sx?: SxProps;
}

export const DateRange: FC<DateRangeProps> = ({ startDate, endDate, sx }) => {
  const theme = useTheme();
  const start = new Date(startDate);
  const end = new Date(endDate);

  return (
    <Stack direction='row' spacing='0.6rem' alignItems='center' sx={sx}>
      <DateRangeIcon
        sx={{
          color: theme.palette.primary.dark,
          fontSize: '2rem',
        }}
      />
      <Typography variant='caption'>{format(start, 'MMM d, yyyy')}</Typography>–
      <Typography variant='caption'>{format(end, 'MMM d, yyyy')}</Typography>
    </Stack>
  );
};
