'use client';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import { Avatar } from '../../core/avatar/avatar';

interface TopBarProps {
  height: string;
}

export const TopBar: FC<TopBarProps> = ({ height }) => {
  const theme = useTheme();
  return (
    <Stack
      bgcolor='background.paper'
      height={height}
      alignItems='center'
      justifyContent='center'
      borderBottom={`2px solid ${theme.palette.background.default}`}
      p='1.2rem 3.2rem'
    >
      <Box ml='auto' display='flex' alignItems='center' gap='1.2rem'>
        <Avatar src='/images/avatar.jpg' size={48} />
        <Typography color='text.secondary'>Eva Traveler</Typography>
      </Box>
    </Stack>
  );
};
