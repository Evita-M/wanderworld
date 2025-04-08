'use client';
import { Box, Button, Stack, useTheme } from '@mui/material';
import Link from 'next/link';
import { routes } from '@/lib/config/routes';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExploreIcon from '@mui/icons-material/Explore';
import GroupIcon from '@mui/icons-material/Group';
import { Logo } from '@/shared/ui/core/logo/logo';
import { Link as LinkType, NavLink } from '@/shared/ui/core/link/nav-link';

const navLinks: LinkType[] = [
  {
    label: 'Dashboard',
    href: routes.home,
    icon: <DashboardIcon />,
  },
  {
    label: 'Expeditions',
    href: routes.expeditions,
    icon: <ExploreIcon />,
  },
  {
    label: 'Guides',
    href: routes.guides,
    icon: <GroupIcon />,
  },
];

export const Navbar = () => {
  const theme = useTheme();
  return (
    <Stack
      component='nav'
      height='100%'
      width='34rem'
      bgcolor='background.paper'
      borderRight={`2px solid ${theme.palette.background.default}`}
    >
      <Stack
        borderBottom={`2px solid ${theme.palette.background.default}`}
        p='2.4rem 1.2rem'
        alignItems='center'
      >
        <Link href={routes.home} aria-label='Go home'>
          <Logo />
        </Link>
      </Stack>
      <Stack component='ul' p='1.2rem' spacing='1.6rem' direction='column'>
        {navLinks.map((link) => (
          <Box key={link.href} component='li'>
            <NavLink link={link} />
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};
