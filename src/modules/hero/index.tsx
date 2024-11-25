import { Image, ResponsiveImage } from '@/components/core/ResponsiveImage';
import { Typewriter } from '@/components/core/Typewriter';
import { Box, Stack, Typography } from '@mui/material';
import { deepOrange, green, grey, lightGreen } from '@mui/material/colors';
import React, { FC } from 'react';

type HeroProps = {
  images: Image[];
};

export const Hero: FC<HeroProps> = ({ images }) => {
  return (
    <Stack direction='row' width='100%' gap={2} maxWidth='70%'>
      <Box flex='0 0 8rem' pt='9rem'>
        <Typography
          variant='h1'
          fontWeight={600}
          color={lightGreen[900]}
          sx={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Wander
        </Typography>
      </Box>
      <Box flex='1'>
        <Stack direction='row' alignItems='flex-end' flexWrap='wrap'>
          <Typography
            variant='h1'
            fontWeight={600}
            color={lightGreen[900]}
            pr='3.2rem'
          >
            The World
          </Typography>

          <Typewriter>
            <Typography
              variant='h3'
              component='h2'
              pb='0.8rem'
              color={grey[900]}
            >
              Journey Beyond the Ordinary.
            </Typography>
          </Typewriter>
        </Stack>
        <Box
          borderTop='2px solid black'
          borderRight='2px solid black'
          borderRadius='0 5rem 0'
          pt={4}
          pr={4}
          justifyContent='center'
          alignItems='center'
        >
          <Stack direction='row' gap={4} width='100%'>
            <Box flex='1 1 60%'>
              <ResponsiveImage
                img={images[0]}
                borderRadius='5rem 24rem 24rem 5rem'
                aspectRatio={images[0].height / images[0].width}
              />
            </Box>
            <Box flex='1 1 40%'>
              <ResponsiveImage
                img={images[1]}
                borderRadius='5rem'
                aspectRatio={images[1].height / images[1].width}
              />
            </Box>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};
