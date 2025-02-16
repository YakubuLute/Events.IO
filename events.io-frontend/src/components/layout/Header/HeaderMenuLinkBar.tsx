import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Menu, MenuItem, MenuProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import styles from './header.module.scss';

interface Item {
  name: string;
  url?: string;
  subLinks?: {
    name: string;
    url: string;
  }[];
}

interface HeaderMenuLinksProps {
  window?: () => Window;
  navItems: Item[];
  menuClass?: PlatformType;
  children?: React.ReactNode | JSX.Element | JSX.Element[];
  isRoot?: boolean;
}

type PlatformType =
  | 'candidate_menu'
  | 'employee_menu'
  | 'univertity_menu'
  | 'role_options';

// const drawerWidth = 240;

export const HeaderMenuLinkBar: React.FC<HeaderMenuLinksProps> = (
  props: HeaderMenuLinksProps
) => {
  const { navItems = [], menuClass, isRoot } = props;
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (link: string) => {
    router.push(link);
    setAnchorEl(null);
  };

  return (
    <Typography
      component="ul"
      sx={{
        display: {
          xs: 'none !important',
          md: isRoot ? 'flex !important' : 'none !important',
          xxl: 'flex !important',
          justifyContent: 'flex-start !important',
        },
      }}
      classes={{
        root: `${styles.nav_items} ${menuClass ? styles[menuClass] : ''}`,
      }}
    >
      {navItems.map((item, index) => {
        if (item.name === 'Verification Center') {
          return;
        } else if (item.name === 'Referrals') {
          return;
        } else {
          return (
            <li
              key={index}
              className={[
                styles.nav_item,
                item?.url === pathname ? styles.active : null,
              ].join(' ')}
            >
              {item?.url ? (
                <Link href={item?.url} className="">
                  {item.name}
                </Link>
              ) : item?.subLinks?.length ? (
                <>
                  <Button
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="text"
                    className={[
                      styles.btnLink,
                      item?.subLinks?.find((l) => l.url === pathname)
                        ? styles.active
                        : null,
                    ].join(' ')}
                    onClick={handleClick}
                  >
                    {item?.name}
                  </Button>
                  <StyledMenu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    {item?.subLinks?.map((link, idx) => (
                      <MenuItem
                        onClick={() => handleClose(link?.url)}
                        key={idx}
                        sx={{
                          fontSize: 14,
                          fontWeight: 500,
                        }}
                      >
                        {link?.name}
                      </MenuItem>
                    ))}
                  </StyledMenu>
                </>
              ) : null}
            </li>
          );
        }
      })}
    </Typography>
  );
};

const StyledMenu = styled(({ ...props }: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
    slotProps={{
      paper: {
        sx: {
          borderRadius: '8px',
          padding: '4px',
          width: '120px',
          boxShadow: '0px 6px 16px -6px rgba(17, 12, 34, 0.10)',
          marginTop: '-10px',
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
}));
