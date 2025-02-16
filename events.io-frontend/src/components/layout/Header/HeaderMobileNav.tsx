import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Drawer, Typography } from '@mui/material';

import { useHeaderContext } from '@/contexts/headerContext';
import { NavItem } from '@/constants/NavLink';
import FeedbackButton from './Feedback/FeedbackButton';
import styles from './header.module.scss';

type Props = {
  univercityNavLink: NavItem[];
};

const HeaderMobileNav = ({ univercityNavLink }: Props) => {
  const { headerOpen, setHeaderOpen } = useHeaderContext();
  const router = useRouter();

  const pushLink = (link: string) => {
    router.push(link);
    setHeaderOpen(false);
  };

  return (
    <Drawer
      anchor="right"
      open={headerOpen}
      id="aside"
      className={styles.headerMobileContainer}
      sx={{
        '& .MuiDrawer-paper': {
          // position: { xs: 'absolute', xl: 'relative' },
          width: headerOpen ? '250px' : 'auto',
        },
      }}
    >
      <div className={styles.drawerContainer}>
        <div className={styles.menuContainer}>
          <div className={styles.menuTitleBox}>
            <Typography className={styles.menuTitle}>Menu</Typography>
          </div>
          {univercityNavLink?.map((item: NavItem, index: number) => {
            return (
              <div className={styles.menuItem} key={index}>
                <button onClick={() => pushLink(item?.url)}>
                  <Typography className={styles.headerMobileLink}>
                    {item?.name}
                  </Typography>
                </button>
              </div>
            );
          })}
          <FeedbackButton sx={{ my: 1 }} />
        </div>
      </div>
    </Drawer>
  );
};

export default HeaderMobileNav;
