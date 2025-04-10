'use client';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Stack, Typography } from '@mui/material';

export interface Link {
  label: string;
  href: string;
  icon?: ReactNode;
}

interface NavLinkProps {
  link: Link;
}

export const NavLink: FC<NavLinkProps> = ({ link }) => {
  const pathname = usePathname();
  const isActive = pathname === link.href;

  return (
    <Link href={link.href}>
      <Stack
        component='span'
        direction='row'
        gap='1.4rem'
        borderRadius='0.8rem'
        color='primary.contrastText'
        bgcolor={isActive ? 'primary.dark' : 'transparent'}
        p='1rem 1.2rem'
        sx={{
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: isActive ? 'primary.darker' : 'primary.dark',
            color: 'primary.contrastText',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
          },
        }}
      >
        {link.icon}
        <Typography component='span' fontWeight={500} color='inherit'>
          {link.label}
        </Typography>
      </Stack>
    </Link>
  );
};
