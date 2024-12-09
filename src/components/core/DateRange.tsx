import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { DateRange as DateRangeIcon } from '@mui/icons-material';
import { format } from 'date-fns';

interface DateRangeProps {
  startDate: Date;
  endDate: Date;
}

export const DateRange: FC<DateRangeProps> = ({ startDate, endDate }) => {
  return (
    <Stack direction='row' gap='0.6rem' alignItems='center'>
      <DateRangeIcon color='primary' sx={{ p: '0.2rem' }} />
      <Typography>{format(startDate, 'dd/MM/yyyy')}</Typography> –
      <Typography>{format(endDate, 'dd/MM/yyyy')}</Typography>
    </Stack>
  );
};
