'use client';
import { Box, IconButton, Stack } from '@mui/material';
import { FC } from 'react';
import { Avatar } from '../../core/avatar/avatar';
import { IconBubble, IconHeart } from '@tabler/icons-react';

interface TopBarProps {
  height: string;
}

export const TopBar: FC<TopBarProps> = ({ height }) => (
  <Stack
    bgcolor='background.default'
    height={height}
    alignItems='center'
    justifyContent='center'
  >
    <Box ml='auto' display='flex' alignItems='center' gap='1.6rem'>
      <IconButton color='error' size='large'>
        <IconHeart />
      </IconButton>
      <IconButton size='large'>
        <IconBubble />
      </IconButton>
      <Avatar src='/images/avatar.jpg' size={48} />
    </Box>
  </Stack>
);
