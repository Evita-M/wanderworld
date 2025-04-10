import { Stack, useTheme } from '@mui/material';
import { FC } from 'react';

export const AvatarWrapper: FC<{ size: number; children: React.ReactNode }> = ({
  size,
  children,
}) => {
  const theme = useTheme();
  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      overflow='hidden'
      bgcolor={theme.palette.tertiary.light}
      border={`${size / 28}px solid ${theme.palette.tertiary.dark}`}
      borderRadius='50%'
      flexShrink={0}
      width={size}
      height={size}
    >
      {children}
    </Stack>
  );
};
