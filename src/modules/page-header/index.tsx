import { Box, Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React, { FC } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  buttonLabel?: string;
  href: string;
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  subtitle,
  buttonLabel,
  href,
}) => {
  return (
    <div>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='h1'>{title}</Typography>
        {href && (
          <Box>
            <Link href={href} passHref>
              <Button size='large' variant='contained' color='success'>
                {buttonLabel}
              </Button>
            </Link>
          </Box>
        )}
      </Stack>
      <Typography fontSize='1.8rem' maxWidth='140rem' lineHeight={1.6}>
        {subtitle}
      </Typography>
    </div>
  );
};
