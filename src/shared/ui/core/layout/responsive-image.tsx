import { Box } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

export type Image = {
  alt: string;
  width: number;
  height: number;
  src: string;
};

type ResponsiveImageProps = {
  img: Image;
  borderRadius?: string | number;
  aspectRatio?: number;
};

export const ResponsiveImage: FC<ResponsiveImageProps> = ({
  img,
  aspectRatio = 1, // default to 1:1 aspect ratio
  borderRadius = 0,
}) => {
  return (
    <Box
      position='relative'
      width='100%'
      paddingTop={`${aspectRatio * 100}%`}
      borderRadius={borderRadius}
      overflow='hidden'
    >
      <Image
        src={img.src}
        fill
        className='absolute inset-0'
        role='img'
        alt={img.alt}
      />
    </Box>
  );
};
