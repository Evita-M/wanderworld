import React, { FC } from 'react';
import { MuseoModerno } from 'next/font/google';
import Image from 'next/image';
import { Box, Stack, Typography } from '@mui/material';

const museoModerno = MuseoModerno({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export const Logo: FC = () => {
  const renderLogoText = (text: string) => (
    <Typography
      fontSize='24px'
      fontWeight={600}
      color='black'
      letterSpacing='0.025em'
      className={`${museoModerno.className}`}
    >
      {text}
    </Typography>
  );

  return (
    <Stack height='28px' flexDirection='row' alignItems='center'>
      {renderLogoText('WanderW')}
      <Box component='span' pb='4px'>
        <Image src='globe.svg' width={26} height={26} alt='Globe icon' />
      </Box>
      {renderLogoText('rld')}
    </Stack>
  );
};
