import { FC } from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import { DateRange as DateRangeIcon } from '@mui/icons-material';
import { format } from 'date-fns';

interface DateRangeProps {
  startDate: Date;
  endDate: Date;
}

export const DateRange: FC<DateRangeProps> = ({ startDate, endDate }) => {
  const theme = useTheme();

  return (
    <Stack direction='row' gap='0.6rem' alignItems='center'>
      <DateRangeIcon sx={{ color: theme.palette.primary.main, p: '0.2rem' }} />
      <Typography>{format(startDate, 'dd/MM/yyyy')}</Typography> –
      <Typography>{format(endDate, 'dd/MM/yyyy')}</Typography>
    </Stack>
  );
};
