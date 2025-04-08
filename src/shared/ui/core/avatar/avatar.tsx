import { FC } from 'react';
import { Avatar as MuiAvatar, Stack, useTheme } from '@mui/material';
import { AvatarWrapper } from './avatar-wrapper';

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
  const theme = useTheme();
  const displayInitials = initials?.slice(0, 2).toUpperCase() || '';
  const imgDimensions = {
    width: size,
    height: size,
  };

  if (!src) {
    return (
      <AvatarWrapper size={size}>
        <MuiAvatar
          sx={{
            ...imgDimensions,
            bgcolor: theme.palette.tertiary.main,
            color: 'white',
            border: `${size / 35}px solid ${theme.palette.tertiary.main}`,
            fontSize: `${size / 25}rem`,
          }}
          aria-label={alt || 'Avatar with initials'}
        >
          {displayInitials}
        </MuiAvatar>
      </AvatarWrapper>
    );
  }

  return (
    <AvatarWrapper size={size}>
      <MuiAvatar
        src={src}
        alt={alt}
        sx={imgDimensions}
        aria-label={alt || 'Avatar image'}
      />
    </AvatarWrapper>
  );
};
