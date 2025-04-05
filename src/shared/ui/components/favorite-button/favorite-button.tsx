'use client';

import { IconButton, SxProps, useTheme } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

const ICON_SIZE = '2.4rem';

interface FavoriteButtonProps {
  isFavorite?: boolean;
  onToggle?: (isFavorite: boolean) => void;
  sx?: SxProps;
}

export function FavoriteButton({
  isFavorite: initialIsFavorite = false,
  onToggle,
  sx,
}: FavoriteButtonProps) {
  const theme = useTheme();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const handleClick = (e: React.MouseEvent) => {
    setIsFavorite(!isFavorite);
    onToggle?.(!isFavorite);
  };

  return (
    <IconButton
      disableTouchRipple
      sx={{
        flex: 0,
        p: '0.6rem',
        borderRadius: '0.8rem',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: 'white',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
          '& .MuiSvgIcon-root': {
            animation: 'jiggle 0.5s ease-in-out',
          },
        },
        '@keyframes jiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-10deg)' },
          '75%': { transform: 'rotate(10deg)' },
        },
        ...(sx || {}),
      }}
      onClick={handleClick}
    >
      {isFavorite ? (
        <FavoriteIcon
          sx={{
            color: theme.palette.secondary.main,
            fontSize: ICON_SIZE,
          }}
        />
      ) : (
        <FavoriteBorderIcon
          sx={{
            fontSize: ICON_SIZE,
            color: theme.palette.text.primary,
          }}
        />
      )}
    </IconButton>
  );
}
