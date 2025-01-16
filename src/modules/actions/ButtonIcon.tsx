import { FC } from 'react';
import { ButtonIconProps } from './types';
import { Box } from '@mui/material';

export const ButtonIcon: FC<ButtonIconProps> = ({ icon, showLabel }) => (
  <Box component='span' sx={{ mr: showLabel ? 1 : 0 }}>
    {icon}
  </Box>
);
