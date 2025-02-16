import { MouseEvent, PropsWithChildren, useState } from 'react';
import { Button, ButtonProps, Menu, MenuProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import CheveronDownIcon from '@/components/shared/SVG-components/ChevronDownIcon';
import styles from './styles.module.scss';

type Props = ButtonProps & {
  btnText: string;
};

export default function ButtonDropdownAlt({
  variant,
  color,
  btnText,
  children,
  ...props
}: PropsWithChildren<Props>) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorElement);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorElement(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <>
      <Button
        id="btn-dropdown"
        aria-controls={open ? 'btn-dropdown' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant={variant}
        color={color}
        onClick={handleClick}
        endIcon={<CheveronDownIcon />}
        {...props}
        className={styles.btn}
      >
        {btnText}
      </Button>
      <StyledMenu
        id="menu-dropdown"
        MenuListProps={{ 'aria-labelledby': 'btn-dropdown' }}
        anchorEl={anchorElement}
        open={open}
        onClose={handleClose}
      >
        {children}
      </StyledMenu>
    </>
  );
}

const StyledMenu = styled(({ ...props }: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    slotProps={{
      paper: {
        sx: {
          borderRadius: '12px',
          border: '1px solid #ECECED',
          width: '350px',
          boxShadow: '0px 16px 20px -8px rgba(17, 12, 34, 0.10)',
        },
      },
    }}
    {...props}
  />
))(({ theme }) => ({
  marginTop: theme.spacing(3),
  '& .MuiMenu-list': {
    padding: '4px 0',
  },
  '& .MuiMenuItem-root': {
    svg: {
      height: 16,
      width: 16,
      marginRight: theme.spacing(1.5),
    },
  },
}));
