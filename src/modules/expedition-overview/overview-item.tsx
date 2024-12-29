import { Box, Stack, Typography } from '@mui/material';
import { FC, ReactElement, cloneElement } from 'react';

export const ICON_SIZE = 40;

interface OverviewItemProps {
  icon: ReactElement;
  title: string;
  description: string;
}

export const OverviewItem: FC<OverviewItemProps> = ({
  icon,
  title,
  description,
}) => (
  <Stack direction='row' spacing={3}>
    {cloneElement(icon, {
      color: 'primary',
      sx: { fontSize: ICON_SIZE },
    })}
    <Box>
      <Typography fontWeight={600} mb='0.6rem'>
        {title}
      </Typography>
      <Typography color='text.secondary'>{description}</Typography>
    </Box>
  </Stack>
);
