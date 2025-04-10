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
import { FC, useState } from 'react';
import Image from 'next/image';
import { useSidebarDrag } from '@/lib/hooks/use-sidebar-drag';

const NAVBAR_WIDTH = '34rem';
const NAVBAR_WIDTH_CLOSED = '7.4rem';

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
  const [isOpen, setIsOpen] = useState(true);

  const { handleMouseDown } = useSidebarDrag({
    initialIsOpen: isOpen,
    onToggle: setIsOpen,
  });

  return (
    <Stack
      component='nav'
      height='100%'
      borderRadius='2.4rem'
      width={isOpen ? NAVBAR_WIDTH : NAVBAR_WIDTH_CLOSED}
      bgcolor={theme.palette.primary.main}
      sx={{
        transition: 'width 0.3s ease',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '1rem',
          cursor: 'ew-resize',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
        onMouseDown={handleMouseDown}
      />
      <Stack
        direction='row'
        justifyContent='center'
        height={height}
        alignItems='center'
      >
        <Link href={routes.home} aria-label='Go home'>
          {isOpen ? (
            <Logo />
          ) : (
            <Image src='/globe.svg' alt='Logo' width={32} height={32} />
          )}
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
            <NavLink link={link} isOpen={isOpen} />
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};
