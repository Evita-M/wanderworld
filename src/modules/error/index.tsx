import { PageContainer } from '@/components/core/PageContainer';
import { Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface ErrorPageProps {
  title: string;
  message: string;
  submessage?: string;
  button?: { label: string; href?: string; onClick?: VoidFunction };
  children: ReactNode;
}

export const ErrorPage: FC<ErrorPageProps> = ({
  title,
  message,
  submessage = 'Check the page address or go home',
  button,
  children,
}) => {
  return (
    <Stack component='section' textAlign='center' height='100%'>
      <Stack bgcolor='primary.main' width='100%' textAlign='left' py='1.8rem'>
        <PageContainer>
          <Typography color='white' fontSize='1.8rem' fontWeight={600}>
            {message}
          </Typography>
        </PageContainer>
      </Stack>
      <PageContainer>
        <Stack
          spacing={2}
          alignItems='center'
          justifyContent='center'
          height='100%'
          textAlign='center'
        >
          {children}
          <Typography component='h1' fontSize='1.8rem' fontWeight={500}>
            {title}
          </Typography>
          <Typography color='text.secondary'>{submessage}</Typography>
          {button && (
            <Button
              variant='contained'
              size='large'
              color='secondary'
              sx={{ mt: '2.4rem' }}
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
