import { Box, Typography } from '@mui/material';
import { FC } from 'react';

interface ExpeditionSectionProps {
  title: string;
  content: React.ReactNode;
}

export const ExpeditionSection: FC<ExpeditionSectionProps> = ({
  title,
  content,
}) => (
  <Box>
    <Typography component='h3' variant='h6' mb='1.2rem'>
      {title}
    </Typography>
    {content}
  </Box>
);
