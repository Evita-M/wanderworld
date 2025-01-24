import { Box, Button, Stack, Typography, SxProps, Theme } from '@mui/material';
import Link from 'next/link';

import React, { FC, ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  prefix?: ReactNode;
  buttonLabel?: string;
  href?: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  subtitle,
  prefix,
  buttonLabel,
  href,
  onClick,
  sx,
}) => {
  return (
    <Stack sx={sx}>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Stack direction='row' alignItems='center' gap={3}>
          {prefix}
          <Typography variant='h1'>{title}</Typography>
        </Stack>
        {buttonLabel && (
          <Box>
            {onClick ? (
              <Button variant='contained' color='secondary' onClick={onClick}>
                {buttonLabel}
              </Button>
            ) : (
              href && (
                <Link href={href} passHref>
                  <Button variant='contained' color='secondary'>
                    {buttonLabel}
                  </Button>
                </Link>
              )
            )}
          </Box>
        )}
      </Stack>
      {subtitle && (
        <Typography fontSize='1.8rem' maxWidth='140rem' lineHeight={1.6}>
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};
