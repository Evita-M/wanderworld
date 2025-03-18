import { Box, Button, Stack, Typography, SxProps, Theme } from '@mui/material';
import { grey } from '@mui/material/colors';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';

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
    <Stack sx={sx} gap={1}>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Stack direction='row' alignItems='center' gap={3}>
          {prefix}
          <Typography variant='h2' component='h1'>
            {title}
          </Typography>
        </Stack>
        {buttonLabel && (
          <Box>
            {onClick ? (
              <Button
                variant='contained'
                color='secondary'
                data-testid='page-header-button'
                onClick={onClick}
              >
                {buttonLabel}
              </Button>
            ) : (
              href && (
                <Link href={href} passHref>
                  <Button
                    component='span'
                    variant='contained'
                    color='secondary'
                    data-testid='page-header-button'
                    startIcon={<AddIcon />}
                  >
                    {buttonLabel}
                  </Button>
                </Link>
              )
            )}
          </Box>
        )}
      </Stack>
      {subtitle && (
        <Typography
          fontSize='1.8rem'
          maxWidth='140rem'
          lineHeight={1.6}
          color={grey[600]}
        >
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};
