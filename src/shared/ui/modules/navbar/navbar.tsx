'use client';
import { Box, Stack, useTheme } from '@mui/material';
import Link from 'next/link';
import { routes } from '@/lib/config/routes';
import {
  IconCompass,
  IconLayoutDashboard,
  IconUsers,
} from '@tabler/icons-react';
import { Logo } from '@/shared/ui/core/logo/logo';
import { Link as LinkType, NavLink } from '@/shared/ui/core/link/nav-link';
import { FC } from 'react';

const navLinks: LinkType[] = [
  {
    label: 'Dashboard',
    href: routes.home,
    icon: <IconLayoutDashboard />,
  },
  {
    label: 'Expeditions',
    href: routes.expeditions,
    icon: <IconCompass />,
  },
  {
    label: 'Guides',
    href: routes.guides,
    icon: <IconUsers />,
  },
];

interface NavbarProps {
  height: string;
}

export const Navbar: FC<NavbarProps> = ({ height }) => {
  const theme = useTheme();
  return (
    <Stack
      component='nav'
      height='100%'
      borderRadius='2.4rem'
      width='34rem'
      bgcolor={theme.palette.primary.main}
    >
      <Stack justifyContent='center' height={height} alignItems='center'>
        <Link href={routes.home} aria-label='Go home'>
          <Logo />
        </Link>
      </Stack>
      <Stack
        component='ul'
        p='2.4rem 1.2rem'
        spacing='1.6rem'
        direction='column'
      >
        {navLinks.map((link) => (
          <Box key={link.href} component='li'>
            <NavLink link={link} />
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};
