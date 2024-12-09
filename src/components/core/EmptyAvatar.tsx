import { Avatar } from '@mui/material';
import { FC } from 'react';

type EmptyAvatarProps = {
  initials?: string;
  size: number;
};

export const EmptyAvatar: FC<EmptyAvatarProps> = ({ initials = '', size }) => {
  const displayInitials = initials.slice(0, 2).toUpperCase();

  return (
    <Avatar
      sx={{
        width: size,
        height: size,
        bgcolor: 'info.main',
        color: 'white',
        fontSize: size * 0.4,
      }}
    >
      {displayInitials || ''}
    </Avatar>
  );
};
