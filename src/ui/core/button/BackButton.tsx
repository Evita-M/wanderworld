import React, { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useTheme } from '@mui/material';

interface BackButtonProps {
  onClick: () => void;
  color?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  sx?: object;
}

export const BackButton: FC<BackButtonProps> = ({
  onClick,
  color = 'primary',
  size = 'medium',
  sx,
}) => {
  const theme = useTheme();
  return (
    <IconButton
      onClick={onClick}
      color={color}
      sx={{
        border: `2px solid ${
          color === 'primary'
            ? theme.palette.primary.main
            : theme.palette.secondary.main
        }`,
        borderRadius: '50%',
        p: '1.2rem',
        ...sx,
      }}
    >
      <ArrowBackIosNewRoundedIcon fontSize={size} />
    </IconButton>
  );
};
