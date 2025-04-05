import {
  Box,
  Button,
  Stack,
  Typography,
  SxProps,
  Theme,
  useTheme,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';

import { FC, ReactNode } from 'react';

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
      <Box pb='2.4rem'>{prefix}</Box>
      <Stack
        direction='row'
        alignItems='flex-end'
        justifyContent='space-between'
      >
        <Stack gap='1.2rem'>
          {subtitle && (
            <Typography maxWidth='140rem' variant='body2'>
              {subtitle}
            </Typography>
          )}
          <Typography variant='h2' component='h1'>
            {title}
          </Typography>
        </Stack>
        {buttonLabel && (
          <Box pb='0.4rem'>
            {onClick ? (
              <Button
                variant='contained'
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
    </Stack>
  );
};
