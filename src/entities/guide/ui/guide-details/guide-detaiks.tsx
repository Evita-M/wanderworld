'use client';

import { Box, Stack, Typography } from '@mui/material';
import { RichTextRenderer } from '@/shared/ui/components/rich-text';
import { Avatar } from '@/shared/ui/core/avatar/avatar';
import { FC } from 'react';

interface GuideDetailProps {
  avatar: string;
  description: string;
}

export const GuideDetail: FC<GuideDetailProps> = ({ avatar, description }) => {
  return (
    <Stack flexDirection='row' gap='3.2rem'>
      <Avatar src={avatar} size={200} />
      <Box flexGrow={1}>
        <Typography variant='caption' component='h4' mb='1.2rem'>
          About me
        </Typography>
        <RichTextRenderer content={description || ''} />
      </Box>
    </Stack>
  );
};
