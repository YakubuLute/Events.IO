import * as React from 'react';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { TOptions } from '@/@types/shared/type';

type MenuDropdownProps = {
  items: TOptions[];
  onSelectItem: (value: TOptions) => void;
  selectedItem: number;
};

export default function MenuDropdown({
  items,
  onSelectItem,
  selectedItem,
}: MenuDropdownProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    _: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    onSelectItem(items[index]);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (selectedItem) {
      const index = items.findIndex(
        (item) => item.value === selectedItem.toString()
      );
      setSelectedIndex(index);
    }
  }, [items, selectedItem]);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          color: '#000',
          fontSize: '16px',
          padding: '8px 0px',
        }}
      >
        {items[selectedIndex].label}{' '}
        <KeyboardArrowDownOutlined sx={{ fontSize: 24 }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          borderRadius: '16px',
          padding: '8px',
        }}
      >
        {items.map((item, idx) => (
          <MenuItem
            sx={{ fontSize: '14px', fontWeight: 600 }}
            key={idx}
            selected={idx === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, idx)}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
