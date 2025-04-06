import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

interface TourDetailsItemProps {
  title: string;
  children: React.ReactNode;
}

export const TourDetailsItem: FC<TourDetailsItemProps> = ({
  title,
  children,
}) => {
  return (
    <Stack direction='column' gap='0.8rem'>
      <Typography color='text.secondary'>{title}</Typography>
      {children}
    </Stack>
  );
};
