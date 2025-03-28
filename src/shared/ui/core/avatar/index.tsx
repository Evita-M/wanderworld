import { FC } from 'react';
import { Avatar as MuiAvatar } from '@mui/material';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  initials?: string;
}

export const Avatar: FC<AvatarProps> = ({
  src,
  alt = '',
  size = 140,
  initials = '',
}) => {
  const displayInitials = initials?.slice(0, 2).toUpperCase() || '';
  const imgDimensions = {
    width: size,
    height: size,
  };

  if (!src) {
    return (
      <MuiAvatar
        sx={{
          ...imgDimensions,
          bgcolor: '#d6e6eb',
          color: 'white',
          fontSize: `${size / 25}rem`,
        }}
        aria-label={alt || 'Avatar with initials'}
      >
        {displayInitials}
      </MuiAvatar>
    );
  }

  return (
    <MuiAvatar
      src={src}
      alt={alt}
      sx={imgDimensions}
      aria-label={alt || 'Avatar image'}
    />
  );
};
