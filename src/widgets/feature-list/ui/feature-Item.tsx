import { Stack, Typography, useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface FeatureItemProps {
  title: string;
  text: string;
  icon?: ReactNode;
}

export const FeatureItem: FC<FeatureItemProps> = ({ title, text, icon }) => {
  const theme = useTheme();
  return (
    <Stack
      direction='column'
      className='rounded-[1.6rem]'
      p='1.6rem'
      gap='1.6rem'
      bgcolor='#ffffff'
    >
      <Typography variant='h6' component='p'>
        {text}
      </Typography>
      <Typography variant='caption' color={theme.palette.primary.main}>
        {title}
      </Typography>
    </Stack>
  );
};
