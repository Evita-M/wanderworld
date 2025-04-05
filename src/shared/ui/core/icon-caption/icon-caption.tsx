import { FC, ReactNode, cloneElement } from 'react';
import { Stack, Typography, SxProps, useTheme } from '@mui/material';
import { IconProps } from '@mui/material';

interface IconCaptionProps extends IconProps {
  icon: ReactNode;
  text: string;
  sx?: SxProps;
}

export const IconCaption: FC<IconCaptionProps> = ({ text, icon, sx }) => {
  const theme = useTheme();

  return (
    <Stack direction='row' alignItems='center' spacing={1} sx={sx}>
      {cloneElement(icon as React.ReactElement, {
        sx: {
          color: theme.palette.primary.dark,
          fontSize: '2rem',
        },
      })}
      <Typography variant='caption'>{text}</Typography>
    </Stack>
  );
};
