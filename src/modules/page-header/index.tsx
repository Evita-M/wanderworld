import { Box, Button, Stack, Typography, SxProps, Theme } from '@mui/material';
import Link from 'next/link';
import React, { FC } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  buttonLabel?: string;
  href?: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  subtitle,
  buttonLabel,
  href,
  onClick,
  sx,
}) => {
  return (
    <Stack sx={sx}>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='h1'>{title}</Typography>
        {buttonLabel && (
          <Box>
            {onClick ? (
              <Button
                size='large'
                variant='contained'
                color='secondary'
                onClick={onClick}
              >
                {buttonLabel}
              </Button>
            ) : (
              href && (
                <Link href={href} passHref>
                  <Button size='large' variant='contained' color='secondary'>
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
