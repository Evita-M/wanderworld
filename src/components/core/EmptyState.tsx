import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  img?: { alt: string; src: string; width: number; height: number };
}

export const EmptyState: FC<EmptyStateProps> = ({
  title,
  description,
  img = { src: '/luggage.png', alt: 'Luggage', width: 380, height: 330 },
}) => {
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      spacing={2}
      height='auto'
      textAlign='center'
    >
      {img && (
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
        />
      )}
      <Typography fontSize='1.8rem' component='h2'>
        {title}
      </Typography>
      {description && (
        <Typography color='text.secondary'>{description}</Typography>
      )}
    </Stack>
  );
};
