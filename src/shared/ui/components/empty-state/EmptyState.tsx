import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { FC, ReactNode } from 'react';

interface ImageProps {
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface EmptyStateProps {
  title: string;
  description?: string;
  img?: ImageProps;
  children?: ReactNode;
}

export const EmptyState: FC<EmptyStateProps> = ({
  title,
  description,
  img = { src: '/luggage.png', alt: 'Luggage', width: 380, height: 330 },
  children,
}) => {
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      spacing='2.4rem'
      height='auto'
      textAlign='center'
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
      />
      <Box>
        <Typography component='h2' variant='h6'>
          {title}
        </Typography>
        {description && (
          <Typography color='text.secondary' mt='1.6rem'>
            {description}
          </Typography>
        )}
      </Box>
      {children}
    </Stack>
  );
};
