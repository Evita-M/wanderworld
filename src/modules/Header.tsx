'use client';
import React from 'react';
import { Button, Stack } from '@mui/material';
import Link from 'next/link';
import { Logo } from '@/components/core/Logo';
import { routes } from '@/routes/index';
import { Link as LinkType, NavLink } from '@/components/core/NavLink';

const navLinks: LinkType[] = [
  {
    label: 'About',
    href: routes.about,
  },
  {
    label: 'Expeditions',
    href: routes.expeditions,
  },
  {
    label: 'Guides',
    href: routes.guides,
  },
];

export const Header = () => {
  return (
    <Stack
      component='nav'
      direction='row'
      justifyContent='space-between'
      px={2}
      py={3}
    >
      <Link href={routes.home} aria-label='Go home'>
        <Logo />
      </Link>
      <Stack direction='row' alignItems='center' gap={4}>
        {navLinks.map((link) => (
          <NavLink link={link} key={link.href} />
        ))}
        <Button variant='contained' onClick={() => null}>
          Log in
        </Button>
      </Stack>
    </Stack>
  );
};
