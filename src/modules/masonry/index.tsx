import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import Masonry from '@mui/lab/Masonry';

const heights = [495, 240, 240, 240, 240];

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '2rem',
  overflow: 'hidden', // Prevents image overflow and ensures it stays within the container's bounds.
}));

const ResponsiveImage = styled('img')({
  width: '100%',
  height: '100%', // Ensures the image takes the full height of the container.
  objectFit: 'cover', // Ensures the image covers the area without distortion (cropping may occur).
});

export const BasicMasonry = () => {
  return (
    <Box sx={{ maxWidth: '1200px', minHeight: 480 }}>
      <Masonry columns={3} spacing={2}>
        {heights.map((height, index) => (
          <Item key={index} sx={{ height }}>
            <ResponsiveImage alt='' src='https://picsum.photos/1280/720' />
          </Item>
        ))}
      </Masonry>
    </Box>
  );
};
