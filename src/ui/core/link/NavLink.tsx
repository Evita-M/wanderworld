'use client';
import { Typography } from '@mui/material';
import Link from 'next/link';
import React, { FC } from 'react';
import { usePathname } from 'next/navigation';

export interface Link {
  label: string;
  href: string;
}

interface NavLinkProps {
  link: Link;
}

export const NavLink: FC<NavLinkProps> = ({ link }) => {
  const pathname = usePathname();
  const isActive = pathname === link.href;

  return (
    <Link href={link.href}>
      <Typography
        component='span'
        color={isActive ? 'primary' : 'default'}
        fontWeight={600}
        fontSize='1.8rem'
      >
        {link.label}
      </Typography>
    </Link>
  );
};
