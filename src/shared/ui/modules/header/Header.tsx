'use client';
import { Button, Stack } from '@mui/material';
import Link from 'next/link';
import { routes } from '@/lib/config/routes';
import { Logo } from '@/shared/ui/core/logo';
import { Link as LinkType, NavLink } from '@/shared/ui/core/link';

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
      alignItems='center'
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
        <Button variant='contained' disabled onClick={() => null}>
          Log in
        </Button>
      </Stack>
    </Stack>
  );
};
