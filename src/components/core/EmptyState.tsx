import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  image?: string;
}

export const EmptyState: FC<EmptyStateProps> = ({
  title,
  description,
  image = '/luggage.jpg',
}) => {
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      spacing={1}
      height='100%'
      textAlign='center'
    >
      <Image src={image} alt={title} width={340} height={340} />
      <Typography variant='h5' component='h2'>
        {title}
      </Typography>
      {description && (
        <Typography color='text.secondary'>{description}</Typography>
      )}
    </Stack>
  );
};
