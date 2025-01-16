import { PageContainer } from '@/ui/core/layout';
import { Button, Stack, SxProps, Theme, Typography } from '@mui/material';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface ErrorBoundaryProps {
  title: string;
  message?: string;
  submessage?: string;
  button?: {
    label: string;
    href: string;
    onClick: VoidFunction;
  };
  image?: ReactNode;
  sx?: SxProps<Theme>;
}

export const ErrorBoundary: FC<ErrorBoundaryProps> = ({
  title,
  message,
  submessage,
  image,
  button,
  sx,
}) => {
  return (
    <Stack component='section' textAlign='center' height='100%' sx={sx}>
      {message && (
        <Stack bgcolor='primary.main' width='100%' textAlign='left' py='1.8rem'>
          <PageContainer>
            <Typography color='white' fontSize='1.8rem' fontWeight={600}>
              {message}
            </Typography>
          </PageContainer>
        </Stack>
      )}
      <PageContainer>
        <Stack
          spacing={2}
          alignItems='center'
          justifyContent='center'
          height='100%'
          textAlign='center'
        >
          {image}
          <Typography component='h1' fontSize='1.8rem' fontWeight={500}>
            {title}
          </Typography>
          <Typography color='text.secondary'>{submessage}</Typography>
          {button && (
            <Button
              variant='contained'
              color='secondary'
              sx={{ mt: '1.6rem' }}
              {...(button.href
                ? {
                    href: button.href,
                    LinkComponent: Link,
                  }
                : {
                    onClick: button.onClick,
                  })}
            >
              {button.label}
            </Button>
          )}
        </Stack>
      </PageContainer>
    </Stack>
  );
};
