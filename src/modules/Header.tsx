import React from 'react';
import { Stack } from '@mui/material';
import Link from 'next/link';
import { Logo } from '@/components/core/Logo';
import { routes } from '@/routes/index';
import { Link as LinkType, NavLink } from '@/components/core/NavLink';

const navLinks: LinkType[] = [
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Expeditions',
    href: '/expeditions',
  },
  {
    label: 'Destinations',
    href: '/destinations',
  },
];

export const Header = () => {
  return (
    <Stack component='nav' direction='row' justifyContent='space-between' p={4}>
      <Link href={routes.home} aria-label='Go home'>
        <Logo />
      </Link>
      <Stack direction='row' gap={4}>
        {navLinks.map((link) => (
          <NavLink link={link} key={link.href} />
        ))}
      </Stack>
    </Stack>
  );
};
