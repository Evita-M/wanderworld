import { SxProps, Theme, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

interface TruncatedTextProps {
  children: ReactNode;
  lines?: number;
  sx?: SxProps<Theme>;
}

export const TruncatedText: FC<TruncatedTextProps> = ({
  children,
  lines = 3,
  sx,
}) => {
  return (
    <Typography
      sx={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lines,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};
