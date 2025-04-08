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
        color={isActive ? 'primary.contrastText' : 'text.secondary'}
        bgcolor={isActive ? 'primary.main' : 'transparent'}
        p='1.2rem'
        sx={{
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: isActive ? 'primary.dark' : 'background.default',
            color: isActive ? 'primary.contrastText' : 'tertiary.darker',
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
