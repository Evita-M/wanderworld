import React, { FC, MouseEvent, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Divider, IconButton, Menu } from '@mui/material';
import { grey, lightGreen } from '@mui/material/colors';

interface MenuListItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface MenuListProps {
  items: MenuListItem[];
}

export const MenuList: FC<MenuListProps> = ({ items }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id='menu'
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ color: grey[900] }} />
      </IconButton>
      <Menu
        id='menu'
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {items.map(({ label, icon, onClick }, index) => (
          <>
            <MenuItem onClick={onClick} disableRipple key={label}>
              <ListItemIcon color='primary'>{icon}</ListItemIcon>
              {label}
            </MenuItem>
            {index < items.length - 1 && <Divider />}
          </>
        ))}
      </Menu>
    </div>
  );
};
