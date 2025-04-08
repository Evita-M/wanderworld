'use client';
import { RoundedContainer } from '@/shared/ui/components/rounded-container/rounded-container';
import { Avatar } from '@/shared/ui/core/avatar/avatar';
import { Box, Stack, Typography, useTheme } from '@mui/material';

export const Hero = () => {
  const theme = useTheme();
  return (
    <RoundedContainer>
      <Stack gap='4rem' direction='row'>
        <Avatar src='/images/avatar.jpg' alt='Eva Traveler' size={200} />
        <Box>
          <Typography variant='h1' mb='1.2rem'>
            Hi, Eva Traveler
          </Typography>
          <Typography color='text.secondary' fontSize='2rem' fontWeight={400}>
            Let's make some new journey!
          </Typography>
        </Box>
      </Stack>
    </RoundedContainer>
  );
};
