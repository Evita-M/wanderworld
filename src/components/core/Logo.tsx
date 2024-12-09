import React, { FC } from 'react';
import Image from 'next/image';
import { Box, Stack, Typography } from '@mui/material';

export const Logo: FC = () => {
  const renderLogoText = (text: string) => (
    <Typography
      variant='h5'
      component='p'
      fontWeight={600}
      color='black'
      letterSpacing='0.025em'
    >
      {text}
    </Typography>
  );

  return (
    <Stack height='28px' flexDirection='row' alignItems='center'>
      {renderLogoText('WanderW')}
      <Box component='span' pb='0.4rem'>
        <Image src='/globe.svg' width={26} height={26} alt='Globe icon' />
      </Box>
      {renderLogoText('rld')}
    </Stack>
  );
};
