import React, { FC } from 'react';
import { Avatar as MuiAvatar } from '@mui/material';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  initials?: string;
}

export const Avatar: FC<AvatarProps> = ({
  src,
  alt,
  size = 140,
  initials = '',
}) => {
  const displayInitials = initials.slice(0, 2).toUpperCase();

  return (
    <>
      {!src ? (
        <MuiAvatar
          sx={{
            width: size,
            height: size,
            bgcolor: 'info.main',
            color: 'white',
            fontSize: size * 0.4,
          }}
        >
          {displayInitials || ''}
        </MuiAvatar>
      ) : (
        <MuiAvatar
          src={src}
          alt={alt}
          sx={{
            width: size,
            height: size,
          }}
        />
      )}
    </>
  );
};
