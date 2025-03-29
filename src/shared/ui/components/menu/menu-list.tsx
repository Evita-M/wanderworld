import { FC, MouseEvent, ReactNode, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Divider, IconButton, Menu } from '@mui/material';
import { grey } from '@mui/material/colors';

interface MenuListItem {
  label: string;
  icon: ReactNode;
  onClick: VoidFunction;
}

interface MenuListProps {
  items: MenuListItem[];
}

export const MenuList: FC<MenuListProps> = ({ items }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = !!anchorEl;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <IconButton
        id='menu'
        onClick={handleClick}
        aria-haspopup='true'
        aria-expanded={isOpen ? 'true' : undefined}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <MoreVertIcon sx={{ color: grey[900] }} />
      </IconButton>
      <Menu
        id='menu'
        anchorEl={anchorEl}
        onClose={handleClose}
        open={isOpen}
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
      >
        {items.map(({ label, icon, onClick }, index) => {
          const hasDivider = index < items.length - 1;
          return (
            <>
              <MenuItem onClick={onClick} disableRipple key={label}>
                <ListItemIcon color='primary'>{icon}</ListItemIcon>
                {label}
              </MenuItem>
              {hasDivider && <Divider />}
            </>
          );
        })}
      </Menu>
    </div>
  );
};
